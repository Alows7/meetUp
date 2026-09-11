import express from "express";
import {
  getEvents,
  getEvent,
  getPublicEvents,
  getMyInvitedEvents,
  getMyCreatedEvents,
  createEvent,
  deleteEvent,
  updateEvent,
  getAnnouncementsByEvent,
} from "../controllers/event.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { requireOwnership } from "../middleware/owner.middleware.js";

const eventRouter = express.Router();

eventRouter.post("/", protectRoute, createEvent);
eventRouter.get("/", protectRoute, getEvents);
eventRouter.get("/invited", protectRoute, getMyInvitedEvents);
eventRouter.get("/public", protectRoute, getPublicEvents);
eventRouter.get(
"/created",
protectRoute,
getMyCreatedEvents,
);
eventRouter.delete(
  "/:id",
  protectRoute,
  requireOwnership("event", "organizerId", "Event not found"),
  deleteEvent,
);
eventRouter.get("/:id", protectRoute, getEvent);
// eventRouter.get(
//   "/:eventId/announcements",
//   protectRoute,
//   getAnnouncementsByEvent,
// );

eventRouter.patch(
  "/:id",
  protectRoute,
  requireOwnership("event", "organizerId", "Event not found"),
  updateEvent,
);

export default eventRouter;
