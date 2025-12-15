import { Request, Response } from "express";
import Hero from "../models/Hero";

export const getAllHeroes = async (req: Request, res: Response) => {
  try {
    const heroes = await Hero.find();
    res.json(heroes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching heroes", error });
  }
};

export const getHeroById = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hero", error });
  }
};

export const createHero = async (req: Request, res: Response) => {
  try {
    const hero = new Hero(req.body);
    await hero.save();
    res.status(201).json(hero);
  } catch (error) {
    res.status(500).json({ message: "Error creating hero", error });
  }
};

export const updateHero = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: "Error updating hero", error });
  }
};

export const deleteHero = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findByIdAndDelete(req.params.id);
    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    }
    res.json({ message: "Hero deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting hero", error });
  }
};
