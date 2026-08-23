import express from "express";
import {
  getGroupMember,
  getGroupMembers,
  createGroupMember,
  deleteGroupMember,
  updateGroupMember,
} from "../controllers/groupMember.controller.js";

const groupMemberRouter = express.Router();

groupMemberRouter.post("/", createGroupMember);
groupMemberRouter.get("/", getGroupMembers);
groupMemberRouter.get("/:id", getGroupMember);
groupMemberRouter.delete("/:id", deleteGroupMember);
groupMemberRouter.put("/:id", updateGroupMember);

export default groupMemberRouter;
