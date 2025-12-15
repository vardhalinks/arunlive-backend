import { Request, Response } from "express";
import Stat from "../models/Stat";

export const getAllStats = async (req: Request, res: Response) => {
  try {
    const stats = await Stat.find();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error });
  }
};

export const getStatById = async (req: Request, res: Response) => {
  try {
    const stat = await Stat.findById(req.params.id);
    if (!stat) {
      return res.status(404).json({ message: "Stat not found" });
    }
    res.json(stat);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stat", error });
  }
};

export const createStat = async (req: Request, res: Response) => {
  try {
    const stat = new Stat(req.body);
    await stat.save();
    res.status(201).json(stat);
  } catch (error) {
    res.status(500).json({ message: "Error creating stat", error });
  }
};

export const updateStat = async (req: Request, res: Response) => {
  try {
    const stat = await Stat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!stat) {
      return res.status(404).json({ message: "Stat not found" });
    }
    res.json(stat);
  } catch (error) {
    res.status(500).json({ message: "Error updating stat", error });
  }
};

export const deleteStat = async (req: Request, res: Response) => {
  try {
    const stat = await Stat.findByIdAndDelete(req.params.id);
    if (!stat) {
      return res.status(404).json({ message: "Stat not found" });
    }
    res.json({ message: "Stat deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting stat", error });
  }
};
