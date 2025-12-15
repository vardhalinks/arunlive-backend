import { Request, Response } from "express";
import Footer from "../models/Footer";

export const getAllFooters = async (req: Request, res: Response) => {
  try {
    const footers = await Footer.find();
    res.json(footers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching footers", error });
  }
};

export const getFooterById = async (req: Request, res: Response) => {
  try {
    const footer = await Footer.findById(req.params.id);
    if (!footer) {
      return res.status(404).json({ message: "Footer not found" });
    }
    res.json(footer);
  } catch (error) {
    res.status(500).json({ message: "Error fetching footer", error });
  }
};

export const createFooter = async (req: Request, res: Response) => {
  try {
    const footer = new Footer(req.body);
    await footer.save();
    res.status(201).json(footer);
  } catch (error) {
    res.status(500).json({ message: "Error creating footer", error });
  }
};

export const updateFooter = async (req: Request, res: Response) => {
  try {
    const footer = await Footer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!footer) {
      return res.status(404).json({ message: "Footer not found" });
    }
    res.json(footer);
  } catch (error) {
    res.status(500).json({ message: "Error updating footer", error });
  }
};

export const deleteFooter = async (req: Request, res: Response) => {
  try {
    const footer = await Footer.findByIdAndDelete(req.params.id);
    if (!footer) {
      return res.status(404).json({ message: "Footer not found" });
    }
    res.json({ message: "Footer deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting footer", error });
  }
};
