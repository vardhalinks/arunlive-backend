import { Request, Response } from "express";
import About from "../models/About";

export const getAllAbout = async (req: Request, res: Response) => {
  try {
    const aboutItems = await About.find();
    res.json(aboutItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching about items", error });
  }
};

export const getAboutById = async (req: Request, res: Response) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) {
      return res.status(404).json({ message: "About item not found" });
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: "Error fetching about", error });
  }
};

export const createAbout = async (req: Request, res: Response) => {
  try {
    const about = new About(req.body);
    await about.save();
    res.status(201).json(about);
  } catch (error) {
    res.status(500).json({ message: "Error creating about", error });
  }
};

export const updateAbout = async (req: Request, res: Response) => {
  try {
    const about = await About.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!about) {
      return res.status(404).json({ message: "About item not found" });
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: "Error updating about", error });
  }
};

export const deleteAbout = async (req: Request, res: Response) => {
  try {
    const about = await About.findByIdAndDelete(req.params.id);
    if (!about) {
      return res.status(404).json({ message: "About item not found" });
    }
    res.json({ message: "About deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting about", error });
  }
};
