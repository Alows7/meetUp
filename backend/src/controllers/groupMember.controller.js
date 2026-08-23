import prisma from "../config/prisma.js";

export async function updateGroupMember(req, res) {
  try {
    const { groupId, userId } = req.body;
    const gm = await prisma.groupMember.update({
      where: {
        id: req.params.id,
      },
      data: {
        groupId: groupId,
        userId: userId,
      },
    });
    res.status(200).json(gm);
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
    console.log("Error at updateGroupMember controller: \n", error);
  }
}

export async function deleteGroupMember(req, res) {
  try {
    await prisma.groupMember.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "GroupMember deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
    console.log("Error at deleteGroupMember controller: \n", error);
  }
}

export async function createGroupMember(req, res) {
  try {
    const { groupId, userId } = req.body;
    const gm = await prisma.groupMember.create({
      data: {
        groupId,
        userId,
      },
    });
    res.status(201).json(gm);
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
    console.log("Error at createGroupMember controller: \n", error);
  }
}

export async function getGroupMember(req, res) {
  try {
    const gm = await prisma.groupMember.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(gm);
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
    console.log("Error at getGroupMember controller: \n", error);
  }
}

export async function getGroupMembers(req, res) {
  try {
    const gm = await prisma.groupMember.findMany();
    res.status(200).json(gm);
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
    console.log("Error at getGroupMembers controller: \n", error);
  }
}
