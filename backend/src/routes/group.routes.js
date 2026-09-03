import express from "express";
import {
  getGroup,
  getMyGroups,
  deleteGroup,
  updateGroup,
  createGroup,
  getMessagesByGroup,
} from "../controllers/group.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { requireGroupAdmin } from "../middleware/admin.middleware.js";

const groupRouter = express.Router();

groupRouter.get("/", protectRoute, getMyGroups);
groupRouter.get("/:id", protectRoute, getGroup);
groupRouter.post("/", protectRoute, createGroup);
groupRouter.patch("/:id", protectRoute, requireGroupAdmin, updateGroup);
groupRouter.delete("/:id", protectRoute, requireGroupAdmin, deleteGroup);
groupRouter.get("/:groupId/messages", protectRoute, getMessagesByGroup);

export default groupRouter;
