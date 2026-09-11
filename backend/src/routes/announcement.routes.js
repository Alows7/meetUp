import express from "express";
import {
  getAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
  createAnnouncement,
  getAnnouncementsByEvent,
} from "../controllers/announcement.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { requireOwnership } from "../middleware/owner.middleware.js";

const announcementRouter = express.Router();

announcementRouter.post("/", protectRoute, createAnnouncement);
announcementRouter.get("/", protectRoute, getAnnouncements);
announcementRouter.get("/:id", protectRoute, getAnnouncement);
announcementRouter.patch(
  "/:id",
  protectRoute,
  requireOwnership("announcement", "authorId", "Announcement not found"),
  updateAnnouncement,
);
announcementRouter.delete(
  "/:id",
  protectRoute,
  requireOwnership("announcement", "authorId", "Announcement not found"),
  deleteAnnouncement,
);
announcementRouter.get("/:eventId", protectRoute, getAnnouncementsByEvent)

export default announcementRouter;
