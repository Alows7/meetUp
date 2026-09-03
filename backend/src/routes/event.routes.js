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

eventRouter.get("/", protectRoute, getEvents);
eventRouter.get("/invited", protectRoute, getMyInvitedEvents);
eventRouter.get("/public", protectRoute, getPublicEvents);
eventRouter.get("/:id", protectRoute, getEvent);
eventRouter.post("/", protectRoute, createEvent);
eventRouter.delete(
  "/:id",
  protectRoute,
  requireOwnership("event", "organizerId", "Event not found"),
  deleteEvent,
);
eventRouter.get(
  "/:eventId/announcements",
  protectRoute,
  getAnnouncementsByEvent,
);

eventRouter.put(
  "/:id",
  protectRoute,
  requireOwnership("event", "organizerId", "Event not found"),
  updateEvent,
);
eventRouter.get(
  "/created",
  protectRoute,
  requireOwnership("event", "organizerId", "Event not found"),
  getMyCreatedEvents,
);





export default eventRouter;
