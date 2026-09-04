import prisma from "../config/prisma.js";

export async function leaveGroup(req, res) {
  try {
    await prisma.groupMember.delete({
      where: {
        groupId_userId: { groupId: req.params.groupId, userId: req.user.id },
      },
    });
    res.status(200).json({ message: "GroupMember deleted successfully" });
  } catch (error) {
    console.log("Error at leaveGroup controller", error);
    next(error);
  }
}

export async function addMember(req, res) {
  try {
    const { groupId, userId } = req.body;
    if (!groupId || !userId)
      return res.status(400).json({ message: "Group and user are required" });
    const gm = await prisma.groupMember.create({
      data: {
        groupId,
        userId,
      },
    });
    res.status(201).json(gm);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Already in the group" });
    }
    console.log("Error at addMember controller");
    next(error);
  }
}

export async function removeMember(req, res) {
  try {
    await prisma.groupMember.delete({ where: { id: req.params.id } });
    res.status(200).json({ message: "Membre retiré du groupe" });
  } catch (error) {
    console.log("Error at removeMember controller");
    next(error);
  }
}

export async function updateMember(req, res) {
  try {
    const { role } = req.body;

    if (!["ADMIN", "MEMBER"].includes(role)) {
      return res.status(400).json({ message: "Rôle invalide" });
    }

    const member = await prisma.groupMember.update({
      where: { id: req.params.id },
      data: { role },
    });

    res.status(200).json(member);
  } catch (error) {
    console.log("Error at updateMemberRole controller");
    next(error);
  }
}
