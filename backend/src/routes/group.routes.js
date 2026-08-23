import express from "express";
import {
  getGroup,
  getGroups,
  deleteGroup,
  updateGroup,
  createGroup,
} from "../controllers/group.controller.js";

const groupRouter = express.Router();

groupRouter.get("/", getGroups);
groupRouter.get("/:id", getGroup);
groupRouter.post("/", createGroup);
groupRouter.put("/:id", updateGroup);
groupRouter.delete("/:id", deleteGroup);

export default groupRouter;
