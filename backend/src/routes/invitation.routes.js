import express from "express"
import { createInvitation, getInvitation, getInvitations, deleteInvitation ,updateInvitation } from "../controllers/invitation.controller.js"

const invitationRouter = express.Router();

invitationRouter.post("/", createInvitation);
invitationRouter.get("/", getInvitations);
invitationRouter.get("/:id", getInvitation);
invitationRouter.put("/:id", updateInvitation);
invitationRouter.delete("/:id", deleteInvitation);

export default invitationRouter;