import mongoose from "mongoose";
import Sortie from "../models/Sortie.js";

export const getAllSortie = async (req, res) => {
  try {
    const sorties = await Sortie.find();
    if (!sorties) return res.json({ message: "No sortie found" });
    res.status(200).json(sorties);
  } catch (error) {
    console.error("Error at getAllSortie controller : ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSortie = async (req, res) => {
  try {
    const sortie = await Sortie.findById(req.params.id);
    if (!sortie) return res.json({ message: "Sortie not found" });
    res.status(200).json(sortie);
  } catch (error) {
    console.error("Error at getSortie controller : ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createSortie = async (req, res) => {
  try {
    const { title, lieu, date, description, participants, mapLink, image } =
      req.body;
    const sortie = new Sortie({
      title,
      lieu,
      date,
      description,
      participants,
      mapLink,
      image,
    });
    const savedSortie = await sortie.save();
    res.status(201).json({ message: "Sortie created successfully !" });
  } catch (error) {
    console.error("Error at createSortie controller : ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateSortie = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, lieu, date, description, participants, mapLink, image } =
      req.body;
    const updatedSortie = await Sortie.findByIdAndUpdate(id, {
      title,
      lieu,
      date,
      description,
      participants,
      mapLink,
      image,
    });
    if (!updatedSortie) return res.json({ message: "error when updating !" });
    res.status(200).json({ message: "Sortie updated successfully !" });
  } catch (error) {
    console.error("Error at updateSortie controller : ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteSortie = async (req, res) => {
  try {
    const id = req.params.id;
    await Sortie.findByIdAndDelete(id);
    res.status(200).json({ message: "Sortie deleted successfully !" });
  } catch (error) {
    console.error("Error at deleteSortie controller : ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
