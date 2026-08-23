import express from "express";
import {
  getAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
  createAnnouncement,
} from "../controllers/announcement.controller.js";

const announcementRouter = express.Router();

announcementRouter.get("/", getAnnouncements);
announcementRouter.get("/:id", getAnnouncement);
announcementRouter.post("/", createAnnouncement);
announcementRouter.put("/:id", updateAnnouncement);
announcementRouter.delete("/:id", deleteAnnouncement);

export default announcementRouter;