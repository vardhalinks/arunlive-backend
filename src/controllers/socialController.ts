import { Request, Response } from "express";
import Social from "../models/Social";

export const getAllSocials = async (req: Request, res: Response) => {
  try {
    const socials = await Social.find();
    res.json(socials);
  } catch (error) {
    res.status(500).json({ message: "Error fetching socials", error });
  }
};

export const getSocialById = async (req: Request, res: Response) => {
  try {
    const social = await Social.findById(req.params.id);
    if (!social) {
      return res.status(404).json({ message: "Social not found" });
    }
    res.json(social);
  } catch (error) {
    res.status(500).json({ message: "Error fetching social", error });
  }
};

export const createSocial = async (req: Request, res: Response) => {
  try {
    const social = new Social(req.body);
    await social.save();
    res.status(201).json(social);
  } catch (error) {
    res.status(500).json({ message: "Error creating social", error });
  }
};

export const updateSocial = async (req: Request, res: Response) => {
  try {
    const social = await Social.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!social) {
      return res.status(404).json({ message: "Social not found" });
    }
    res.json(social);
  } catch (error) {
    res.status(500).json({ message: "Error updating social", error });
  }
};

export const deleteSocial = async (req: Request, res: Response) => {
  try {
    const social = await Social.findByIdAndDelete(req.params.id);
    if (!social) {
      return res.status(404).json({ message: "Social not found" });
    }
    res.json({ message: "Social deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting social", error });
  }
};
