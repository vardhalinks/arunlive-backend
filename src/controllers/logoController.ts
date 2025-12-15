import { Request, Response } from "express";
import Logo from "../models/Logo";

export const getAllLogos = async (req: Request, res: Response) => {
  try {
    const logos = await Logo.find();
    res.json(logos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logos", error });
  }
};

export const getLogoById = async (req: Request, res: Response) => {
  try {
    const logo = await Logo.findById(req.params.id);
    if (!logo) {
      return res.status(404).json({ message: "Logo not found" });
    }
    res.json(logo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logo", error });
  }
};

export const createLogo = async (req: Request, res: Response) => {
  try {
    const logo = new Logo(req.body);
    await logo.save();
    res.status(201).json(logo);
  } catch (error) {
    res.status(500).json({ message: "Error creating logo", error });
  }
};

export const updateLogo = async (req: Request, res: Response) => {
  try {
    const logo = await Logo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!logo) {
      return res.status(404).json({ message: "Logo not found" });
    }
    res.json(logo);
  } catch (error) {
    res.status(500).json({ message: "Error updating logo", error });
  }
};

export const deleteLogo = async (req: Request, res: Response) => {
  try {
    const logo = await Logo.findByIdAndDelete(req.params.id);
    if (!logo) {
      return res.status(404).json({ message: "Logo not found" });
    }
    res.json({ message: "Logo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting logo", error });
  }
};
