import express from "express"
import { getUser, createUser, updateUser, deleteUser, getUsers } from "../controllers/user.controller.js";

const userRouter = express.Router()

userRouter.get("/:id", getUser);
userRouter.get("/", getUsers);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter