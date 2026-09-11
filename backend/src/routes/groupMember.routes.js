import express from "express";
import {
  addMember,
  leaveGroup,
  removeMember,
  updateMember,
} from "../controllers/groupMember.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { requireGroupAdmin } from "../middleware/admin.middleware.js";

const groupMemberRouter = express.Router();

groupMemberRouter.post("/", protectRoute, requireGroupAdmin, addMember);
groupMemberRouter.delete("/leave", protectRoute, leaveGroup);
groupMemberRouter.delete(
  "/remove/:id",
  protectRoute,
  requireGroupAdmin,
  removeMember,
);
groupMemberRouter.patch("/:id", protectRoute, requireGroupAdmin, updateMember);

export default groupMemberRouter;
