import prisma from "../config/prisma.js";

export async function updateAnnouncement(req, res) {
  try {
    const { content } = req.body;
    if (!content)
      return res.status(400).json({ message: "Content is required" });

    const announcement = await prisma.announcement.update({
      where: { id: req.params.id },
      data: { content: content },
    });
    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
    console.log("Error at updateAnnouncement controller :\n", error);
  }
}

export async function deleteAnnouncement(req, res) {
  try {
    await prisma.announcement.delete({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
    console.log("Error at deleteAnnouncement controller :\n", error);
  }
}

export async function createAnnouncement(req, res) {
  try {
    const { content, eventId } = req.body;
    
    if (!content)
      return res.status(400).json({ message: "A content is required" });
    const announcement = await prisma.announcement.create({
      data: {
        content,
        eventId,
        authorId : req.user.id,
      },
    });
    res.status(201).json({ announcement });
  } catch (error) {
    if(error.code === "P2003") return res.status(404).json({message: "Event not found"})
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
      return res.status(404).json({ message: "Announcement not found" });
    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
    console.log("Error at getAnnouncement controller :\n", error);
  }
}

export async function getAnnouncements(req, res) {
  try {
    const announcements = await prisma.announcement.findMany();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
    console.log("Error at updateAnnouncement controller :\n", error);
  }
}
