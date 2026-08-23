import prisma from "../config/prisma.js";

export async function createGroup(req, res) {
  try {
    const { name, isTemporary, eventId } = req.body;
    if (!name) res.status(400).json({ message: "Name is required" });
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
    if (!name) res.status(400).json({ message: "Name is required" });
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
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at getGroup controller ", error);
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
