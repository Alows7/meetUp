import prisma from "../config/prisma.js";

export async function createGroup(req, res) {
  try {
    const { name, isTemporary, eventId } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    const group = await prisma.group.create({
      data: {
        name,
        isTemporary,
        eventId,
      },
    });
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at createGroup controller ", error);
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
        isTemporary: isTemporary,
        eventId: eventId,
      },
    });
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at updateGroup controller ", error);
  }
}

export async function deleteGroup(req, res) {
  try {
    await prisma.group.delete({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ message: "group deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at deleteGroup controller ", error);
  }
}

export async function getGroup(req, res) {
  try {
    const group = await prisma.group.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if(!group) return res.status(404).json({message: "Group not found"})
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at getGroup controller ", error);
  }
}

export async function getMessagesByGroup(req, res) {
  try {
    const { groupId } = req.params;

    const messages = await prisma.message.findMany({
      where: { groupId },
      include: {
        sender: { select: { id: true, pseudo: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error at getMessagesByGroup controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getGroups(req, res) {
  try {
    const groups = await prisma.group.findMany();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at getGroups controller ", error);
  }
}
