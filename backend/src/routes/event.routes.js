import express from "express"
import { getEvents, getEvent, createEvent, deleteEvent, updateEvent, getAnnouncementsByEvent } from "../controllers/event.controller.js"

const eventRouter = express.Router();

eventRouter.get("/", getEvents);
eventRouter.get("/:id", getEvent);
eventRouter.get("/:eventId/announcements", getAnnouncementsByEvent);
eventRouter.put("/:id", updateEvent);
eventRouter.post("/", createEvent);
eventRouter.delete("/:id", deleteEvent);

export default eventRouter;
