import express from "express";
import {
  createInvitation,
  getInvitation,
  getSentInvitationsForEvent,
  getMyInvitations,
  deleteInvitation,
  respondToInvitation,
} from "../controllers/invitation.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { requireOwnership } from "../middleware/owner.middleware.js";

const invitationRouter = express.Router();

invitationRouter.post("/", protectRoute, createInvitation);
invitationRouter.get("/", protectRoute, getMyInvitations);
invitationRouter.get(
  "/:eventId/sent",
  protectRoute,
  getSentInvitationsForEvent,
);

invitationRouter.delete(
  "/:id",
  protectRoute,
  requireOwnership("invitation", "userId", "Invitation not found"),
  deleteInvitation,
);
invitationRouter.get(
  "/:id",
  protectRoute,
  requireOwnership("invitation", "userId", "Invitation not found"),
  getInvitation,
);

invitationRouter.patch(
  "/:id",
  protectRoute,
  requireOwnership("invitation", "userId", "Invitation not found"),
  respondToInvitation,
);
export default invitationRouter;
