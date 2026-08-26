import prisma from "../config/prisma.js";

export async function updateAnnouncement(req, res) {
  try {
    const { content, eventId, authorId } = req.body;
    if (!content)
      return res.status(400).json({ message: "A content is required" });
    const announcement = await prisma.announcement.update({
      where: {
        id: req.params.id,
      },
      data: {
        content: content,
        eventId: eventId,
        authorId: authorId,
      },
    });
    res.status(200).json({ announcement });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
    console.log("Error at updateAnnouncement controller :\n", error);
  }
}

export async function deleteAnnouncement(req, res) {
  try {
    await prisma.announcement.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
    console.log("Error at deleteAnnouncement controller :\n", error);
  }
}

export async function createAnnouncement(req, res) {
  try {
    const { content, eventId, authorId } = req.body;
    if (!content)
      return res.status(400).json({ message: "A content is required" });
    const announcement = await prisma.announcement.create({
      data: {
        content,
        eventId,
        authorId,
      },
    });
    res.status(201).json({ announcement });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
    console.log("Error at createAnnouncement controller :\n", error);
  }
}

export async function getAnnouncement(req, res) {
  try {
    const announcement = await prisma.announcement.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!announcement)
      return res.status(404).json({ message: "Invitation not found" });
    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
    console.log("Error at getAnnouncement controller :\n", error);
  }
}

export async function getAnnouncements(req, res) {
  try {
    const announcements = await prisma.announcement.findMany();
    res.status(200).json({ announcements });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
    console.log("Error at updateAnnouncement controller :\n", error);
  }
}
