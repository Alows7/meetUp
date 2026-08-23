import express from "express";
import {
  getMessage,
  getMessages,
  updateMessage,
  deleteMessage,
  createMessage,
} from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.get("/", getMessages);
messageRouter.get("/:id", getMessage);
messageRouter.put("/:id", updateMessage);
messageRouter.delete("/:id", deleteMessage);
messageRouter.post("/", createMessage);

export default messageRouter