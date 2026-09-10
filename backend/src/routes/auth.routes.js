import express from "express";
import { register, login, googleAuth } from "../controllers/auth.controller.js";

const authRouter = express.Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/google", googleAuth);

export default authRouter;
