import express from "express"
import { getFriendship, getFriendships, deleteFriendship, createFriendship, updateFriendship } from "../controllers/friendship.controller.js";

const friendshipRouter = express.Router();

friendshipRouter.post("/", createFriendship);
friendshipRouter.put("/:id", updateFriendship);
friendshipRouter.get("/", getFriendships);
friendshipRouter.get("/:id", getFriendship);
friendshipRouter.delete("/:id", deleteFriendship);

export default friendshipRouter;