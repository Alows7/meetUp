import express from "express";
import {
  getFriendship,
  getFriends,
  getPendingRequests,
  deleteFriendship,
  createFriendship,
  respondToFriendship,
} from "../controllers/friendship.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { requireOwnership } from "../middleware/owner.middleware.js";

const friendshipRouter = express.Router();

friendshipRouter.get("/friends", protectRoute, getFriends);
friendshipRouter.get("/:id", protectRoute, getFriendship);
friendshipRouter.delete("/:id", protectRoute, deleteFriendship);
friendshipRouter.post(
  "/",
  protectRoute,
  requireOwnership("friendship", "requesterId", "No friendship found"),
  createFriendship,
);
friendshipRouter.get(
  "/resquest",
  protectRoute,
  requireOwnership("friendship", "addresseeId", "No friendship found"),
  getPendingRequests,
);
friendshipRouter.patch(
  "/:id",
  protectRoute,
  requireOwnership("friendship", "addresseeId", "Friendship not found"),
  respondToFriendship,
);

export default friendshipRouter;
