import express from "express";
import {
  getGroup,
  getGroups,
  deleteGroup,
  updateGroup,
  createGroup,
  getMessagesByGroup,
} from "../controllers/group.controller.js";

const groupRouter = express.Router();

groupRouter.get("/", getGroups);
groupRouter.get("/:id", getGroup);
groupRouter.post("/", createGroup);
groupRouter.put("/:id", updateGroup);
groupRouter.delete("/:id", deleteGroup);
groupRouter.get("/:groupId/messages", getMessagesByGroup);

export default groupRouter;
