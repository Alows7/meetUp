import express from "express";
import {
  getAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
  createAnnouncement,
} from "../controllers/announcement.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { requireOwnership } from "../middleware/owner.middleware.js";

const announcementRouter = express.Router();

announcementRouter.get("/", protectRoute, getAnnouncements);
announcementRouter.get("/:id", protectRoute, getAnnouncement);
announcementRouter.post("/", protectRoute, createAnnouncement);
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

export default announcementRouter;
