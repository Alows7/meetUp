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

friendshipRouter.post(
  "/",
  protectRoute,
  createFriendship,
);
friendshipRouter.get(
  "/pending",
  protectRoute,
  getPendingRequests,
);
friendshipRouter.get("/friends", protectRoute, getFriends);
friendshipRouter.get("/:id", protectRoute, getFriendship);
friendshipRouter.delete("/:id", protectRoute, deleteFriendship);
friendshipRouter.patch(
  "/:id",
  protectRoute,
  requireOwnership("friendship", "addresseeId", "Friendship not found"),
  respondToFriendship,
);

export default friendshipRouter;
