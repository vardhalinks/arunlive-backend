import { Request, Response } from "express";
import Pricing from "../models/Pricing";

export const getAllPricing = async (req: Request, res: Response) => {
  try {
    const pricing = await Pricing.find();
    res.json(pricing);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pricing", error });
  }
};

export const getPricingById = async (req: Request, res: Response) => {
  try {
    const pricing = await Pricing.findById(req.params.id);
    if (!pricing) {
      return res.status(404).json({ message: "Pricing not found" });
    }
    res.json(pricing);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pricing", error });
  }
};

export const createPricing = async (req: Request, res: Response) => {
  try {
    const pricing = new Pricing(req.body);
    await pricing.save();
    res.status(201).json(pricing);
  } catch (error) {
    res.status(500).json({ message: "Error creating pricing", error });
  }
};

export const updatePricing = async (req: Request, res: Response) => {
  try {
    const pricing = await Pricing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pricing) {
      return res.status(404).json({ message: "Pricing not found" });
    }
    res.json(pricing);
  } catch (error) {
    res.status(500).json({ message: "Error updating pricing", error });
  }
};

export const deletePricing = async (req: Request, res: Response) => {
  try {
    const pricing = await Pricing.findByIdAndDelete(req.params.id);
    if (!pricing) {
      return res.status(404).json({ message: "Pricing not found" });
    }
    res.json({ message: "Pricing deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting pricing", error });
  }
};
