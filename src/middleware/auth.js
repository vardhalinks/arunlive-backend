<<<<<<< HEAD
import jwt from "jsonwebtoken";
import { createMiddleware } from "hono/factory";

export const protect = createMiddleware(async (c, next) => {
  const authorization = c.req.header("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    try {
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, c.env.JWT_SECRET);
      c.set("admin", decoded);
      await next();
    } catch (err) {
      console.error(err);
      return c.json({ message: "Not authorized, token failed" }, 401);
    }
  } else {
    return c.json({ message: "Not authorized, no token" }, 401);
  }
});
=======
const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "Not authorized" });
  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.adminOnly = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
>>>>>>> 26b11898d829a0913cd311edcd785d77a7b24c06
