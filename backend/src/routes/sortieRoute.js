import express from "express";
import {
  createSortie,
  deleteSortie,
  getAllSortie,
  getSortie,
  updateSortie,
} from "../controllers/sortieControllers.js";

const sortieRouter = express.Router();

sortieRouter.get("/", getAllSortie);
sortieRouter.post("/", createSortie);
sortieRouter.get("/:id", getSortie);
sortieRouter.put("/:id", updateSortie);
sortieRouter.delete("/:id", deleteSortie);

export default sortieRouter
