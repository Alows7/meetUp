import prisma from "../config/prisma.js";

export async function createGroup(req, res) {
  try {
    const { name, isTemporary, eventId } = req.body;
    const creatorId = req.user.id;
    if (!name) return res.status(400).json({ message: "Name is required" });
    const group = await prisma.$transaction(async (tx) => {
      const newGroup = await tx.group.create({
        data: { name, isTemporary: isTemporary || false, eventId },
      });
      await tx.groupMember.create({
        data: { groupId: newGroup.id, userId: creatorId, role: "ADMIN" },
      });

      return newGroup;
    });
    res.status(201).json(group);
  } catch (error) {
    console.log("Error at createGroup controller ");
    next(error);
  }
}

export async function updateGroup(req, res) {
  try {
    const { name, isTemporary, eventId } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    const group = await prisma.group.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: name,
      },
    });
    res.status(200).json(group);
  } catch (error) {
    console.log("Error at updateGroup controller ");
    next(error);
  }
}

export async function deleteGroup(req, res) {
  try {
    await prisma.group.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "group deleted successfully" });
  } catch (error) {
    console.log("Error at deleteGroup controller ");
    next(error);
  }
}

export async function getGroup(req, res) {
  try {
    const group = await prisma.group.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.status(200).json(group);
  } catch (error) {
    console.log("Error at getGroup controller ");
    next(error);
  }
}

// export async function getMessagesByGroup(req, res) {
//   try {
//     const { groupId } = req.params;

//     const messages = await prisma.message.findMany({
//       where: { groupId },
//       include: {
//         sender: { select: { id: true, pseudo: true } },
//       },
//       orderBy: { createdAt: "asc" },
//     });

//     res.status(200).json(messages);
//   } catch (error) {
//     console.log("Error at getMessagesByGroup controller");
//     next(error);
//   }
// }

export async function getMyGroups(req, res) {
  try {
    const memberships = await prisma.groupMember.findMany({
      where: { userId: req.user.id },
      include: { group: true },
    });

    const groups = memberships.map((m) => ({ ...m.group, myRole: m.role }));

    res.status(200).json(groups);
  } catch (error) {
    console.log("Error at getMyGroups controller");
    next(error);
  }
}
