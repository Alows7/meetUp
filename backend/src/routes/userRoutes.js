import express from "express"
import { getUser, createUser, getAllUser, updateUser, deleteUser } from "../controllers/userControllers.js";

const userRouter = express.Router()

userRouter.get("/:id", getUser);
userRouter.get("/", getAllUser);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter