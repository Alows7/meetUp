import express from "express";
import {
  getMessages,
  updateMessage,
  deleteMessage,
  createMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { requireOwnership } from "../middleware/owner.middleware.js";

const messageRouter = express.Router();

messageRouter.post("/", protectRoute, createMessage);
messageRouter.get("/:groupId", protectRoute, getMessages);
messageRouter.patch(
  "/:id",
  protectRoute,
  requireOwnership("message", "senderId", "message not found"),
  updateMessage,
);
messageRouter.delete(
  "/:id",
  protectRoute,
  requireOwnership("message", "senderId", "message not found"),
  deleteMessage,
);

export default messageRouter;
