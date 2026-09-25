import express from "express";
import cors from "cors";
import userRouter from "../routes/user.routes.js";
import eventRouter from "../routes/event.routes.js";
import friendshipRouter from "../routes/friendship.routes.js";
import invitationRouter from "../routes/invitation.routes.js";
import groupRouter from "../routes/group.routes.js";
import messageRouter from "../routes/message.routes.js";
import announcementRouter from "../routes/announcement.routes.js";
import groupMemberRouter from "../routes/groupMember.routes.js";
import authRouter from "../routes/auth.routes.js";
import { errorHandler } from "../middleware/error.middleware.js";
import rateLimiter from "../utils/rateLimiter.js";

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", 
}));

app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);
app.use("/api/friendships", friendshipRouter);
app.use("/api/invitations", invitationRouter);
app.use("/api/groups", groupRouter);
app.use("/api/messages", messageRouter);
app.use("/api/announcements", announcementRouter);
app.use("/api/groupMembers", groupMemberRouter);
app.use("/api/auth", authRouter);
app.use("/api", rateLimiter);

app.use(errorHandler);

export default app;
