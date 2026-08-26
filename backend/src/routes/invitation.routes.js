import express from "express"
import { createInvitation, getInvitation, getInvitations, deleteInvitation ,respondToInvitation } from "../controllers/invitation.controller.js"

const invitationRouter = express.Router();

invitationRouter.post("/", createInvitation);
invitationRouter.get("/", getInvitations);
invitationRouter.get("/:id", getInvitation);
invitationRouter.put("/:id", respondToInvitation);
invitationRouter.delete("/:id", deleteInvitation);

export default invitationRouter;