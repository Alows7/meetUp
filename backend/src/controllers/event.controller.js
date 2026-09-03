import prisma from "../config/prisma.js";

export async function getEvents(req, res) {
  try {
    const events = await prisma.event.findMany();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
    console.log("Error at getEvents controller ", error);
  }
}

export async function getEvent(req, res) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: req.params.id },
      include: {
        organizer: { select: { id: true, pseudo: true } },
        announcements: { orderBy: { createdAt: "desc" } },
        invitations: {
          where: { status: "CONFIRMED" },
          include: { user: { select: { id: true, pseudo: true } } },
        },
      },
    });

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.visibility === "PRIVATE") {
      const isOrganizer = event.organizerId === req.user.id;

      const isInvited = await prisma.invitation.findUnique({
        where: {
          userId_eventId: { userId: req.user.id, eventId: event.id },
        },
      });
      if (!isOrganizer && !isInvited) {
        return res.status(403).json({ message: "Not authorized" });
      }
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
    console.log("Error at getEvent controller", error);
  }
}

export async function createEvent(req, res) {
  try {
    const {
      title,
      description,
      date,
      duration,
      locationName,
      latitude,
      longitude,
    } = req.body;
    if (!title) res.status(400).json({ message: "A title is required" });
    const organizerId = req.user.id;

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date,
        duration,
        locationName,
        organizerId,
        latitude,
        longitude,
      },
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
    console.log("Error at createEvent controller ", error);
  }
}

export async function deleteEvent(req, res) {
  try {
    await prisma.event.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: `Event deleted succefully` });
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
    console.log("Error at deleteEvent controller ", error);
  }
}

export async function updateEvent(req, res) {
  try {
    const {
      title,
      description,
      date,
      duration,
      locationName,
      latitude,
      longitude,
    } = req.body;
    if (!title) res.status(400).json({ message: "A title is required" });
    const event = await prisma.event.update({
      where: {
        id: req.params.id,
      },
      data: {
        title,
        description,
        date,
        duration,
        locationName,
        latitude,
        longitude,
      },
    });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" });
    console.log("Error at updateEvent controller ", error);
  }
}

export async function getAnnouncementsByEvent(req, res) {
  try {
    const { eventId } = req.params;
    const announcements = await prisma.announcement.findMany({
      where: { eventId },
      include: {
        select: { id: true, title: true, description: true },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at getAnnouncementsByEvent controller : \n", error);
  }
}

export async function getPublicEvents(req, res) {
  try {
    const events = await prisma.event.findMany({
      where: {
        visibility: "PUBLIC",
        date: { gte: new Date() }, // gte = greater than or equal
      },
      include: {
        organizer: { select: { id: true, pseudo: true } },
      },
      orderBy: { date: "asc" },
    });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at getPublicEvents controller", error);
  }
}

export async function getMyCreatedEvents(req, res) {
  try {
    const events = await prisma.event.findMany({
      where: { organizerId: req.user.id },
      orderBy: { date: "desc" },
    });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at getMyCreatedEvents controller", error);
  }
}

export async function getMyInvitedEvents(req, res) {
  try {
    const userId = req.user.id;

    const invitations = await prisma.invitation.findMany({
      where: { userId },
      include: {
        event: {
          include: { organizer: { select: { id: true, pseudo: true } } },
        },
      },
      orderBy: { event: { date: "asc" } },
    });

    const events = invitations.map((inv) => ({
      ...inv.event,
      myInvitationStatus: inv.status,
      invitationId: inv.id,
    }));

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at getMyInvitedEvents controller", error);
  }
}
