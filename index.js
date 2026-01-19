import { Hono } from "hono";
import { cors } from "hono/cors";
import Razorpay from "razorpay";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import axios from "axios";
import sectionRoutes from "./src/routes/sectionRoutes.js";
import { connectDB } from "./src/config/db.js";

// Connect to MongoDB
connectDB();

const app = new Hono();

// CORS middleware
app.use("/*", cors({ origin: "*" }));

// One-Time Access token storage
const usedTokens = new Set();

// Required Root Route
app.get("/", (c) => {
  return c.text("Backend running OK! 🚀");
});

// CMS Section Routes
app.route("/api/sections", sectionRoutes);

// Create Order
app.post("/create-order", async (c) => {
  try {
    const { amount } = await c.req.json();
    
    // Razorpay Setup with env vars
    const razorpay = new Razorpay({
      key_id: c.env.RAZORPAY_KEY_ID,
      key_secret: c.env.RAZORPAY_KEY_SECRET,
    });
    
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt#A1",
    });
    
    return c.json(order);
  } catch (err) {
    return c.json({ error: err.message }, 500);
  }
});

// Verify Payment
app.post("/verify-payment", async (c) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await c.req.json();

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", c.env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .digest("hex");

  if (razorpay_signature === expectedSign) {
    return c.redirect("https://arunlive.com/success.html");
  } else {
    return c.redirect("https://arunlive.com/failed.html");
  }
});

// Facebook Meta Conversions API (CAPI) - Lead Tracking
app.post("/api/meta/lead", async (c) => {
  const { eventId } = await c.req.json();

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${c.env.META_PIXEL_ID}/events`,
      {
        data: [
          {
            event_name: "Lead",
            event_time: Math.floor(Date.now() / 1000),
            action_source: "website",
            event_id: eventId // 🔥 dedup key
          }
        ]
      },
      {
        params: {
          access_token: c.env.META_ACCESS_TOKEN
        }
      }
    );

    return c.json({ success: true, response: response.data });
  } catch (error) {
    console.error("Meta CAPI Error:", error.response?.data || error.message);
    return c.json({ error: error.response?.data || error.message }, 500);
  }
});

// JWT Link Generator (One-Time + IP Lock)
app.post("/generate-link", async (c) => {
  const { payment_id } = await c.req.json();
  const ip = c.req.header("x-forwarded-for")?.split(",")[0] || c.req.header("cf-connecting-ip") || "";

  if (!payment_id) {
    return c.json({ error: "payment_id is required" }, 400);
  }

  try {
    const token = jwt.sign(
      { payment_id, ip },
      c.env.JWT_SECRET,
      { expiresIn: "1h" } // 1 hour validity
    );

    return c.json({
      secure_link: `https://main-backend-dzf5.onrender.com/secure-session?token=${token}`,
    });
  } catch {
    return c.json({ error: "Failed to generate link" }, 500);
  }
});

// One-Time Access + IP Verified Access
app.get("/secure-session", (c) => {
  const token = c.req.query("token");
  const ip = c.req.header("x-forwarded-for")?.split(",")[0] || c.req.header("cf-connecting-ip") || "";

  if (!token) {
    return c.text("Token missing!", 400);
  }

  try {
    const data = jwt.verify(token, c.env.JWT_SECRET);

    // One time usage
    if (usedTokens.has(token)) {
      return c.text("⛔ Access Expired!", 403);
    }

    // IP Verified
    if (data.ip !== ip) {
      return c.text("⛔ Invalid Device or IP!", 403);
    }

    usedTokens.add(token);
    return c.redirect("https://calendly.com/linksvardha/60min");

  } catch {
    return c.text("⛔ Session Access Denied", 403);
  }
});

export default app;