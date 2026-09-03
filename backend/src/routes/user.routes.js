import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  getUsers,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/:id", protectRoute, getUser);
userRouter.get("/", protectRoute, getUsers);
userRouter.put("/:id", protectRoute, updateUser);
userRouter.delete("/:id", protectRoute, deleteUser);

export default userRouter;
