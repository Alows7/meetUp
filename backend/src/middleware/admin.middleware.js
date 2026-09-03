import prisma from "../config/prisma.js";

export async function requireGroupAdmin(req, res, next) {
  try {
    const groupId = req.body.groupId || req.params.groupId;

    const membership = await prisma.groupMember.findUnique({
      where: { groupId_userId: { groupId, userId: req.user.id } },
    });

    if (!membership || membership.role !== "ADMIN") {
      return res.status(403).json({ message: "Réservé aux admins du groupe" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at requireGroupAdmin middleware", error);
  }
}