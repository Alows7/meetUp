import prisma from "../config/prisma.js";

export async function createInvitation(req, res) {
  try {
    const { userId, eventId } = req.body;
    if (!userId || !eventId)
      return res
        .status(400)
        .json({ message: "userId and eventId are required" });

    const invitation = await prisma.invitation.create({
      data: { userId, eventId },
    });
    res.status(201).json(invitation);
  } catch (error) {
    if (error.code === "P2002")
      return res.status(409).json({ message: "User already invited" });

    res.status(500).json({ message: "Internal server error" });
    console.log("Error at createInvitation controller ", error);
  }
}

export async function getInvitation(req, res) {
  try {
    const invitation = await prisma.invitation.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!invitation)
      return res.status(400).json({ message: "No invitation found" });

    res.status(200).json(invitation);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at getInvitation controller ", error);
  }
}

export async function getMyInvitations(req, res) {
  try {
    const userId = req.user.id;
    const invitations = await prisma.invitation.findMany({
      where: { userId },
      include: {
        user: { id: true, pseud: true },
        event: { id: true, title: true, date: true },
      },
    });
    res.status(200).json(invitations);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at getMyInvitations controller ", error);
  }
}

export async function respondToInvitation(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!(["CONFIRMED", "DECLINED"].includes(status)))
      return res.status(400).json({ message: "Invalid status" });

    const invitation = await prisma.invitation.update({
      where: { id },
      data: { status },
    });

    res.status(200).json(invitation);
  } catch (error) {
    if(error.code === "P2025") return res.status(404).json({message: "invitation not found"})
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at respondToInvitation controller ", error);
  }
}

export async function deleteInvitation(req, res) {
  try {
    await prisma.invitation.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Invitation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at deleteInvitation controller ", error);
  }
}

export async function getSentInvitationsForEvent(req, res) {
  try {
    const { eventId } = req.params;

    const event = await prisma.event.findUnique({ where: { id: eventId } });

    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.organizerId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not the organizer of this event" });
    }

    const invitations = await prisma.invitation.findMany({
      where: { eventId },
      include: { user: { select: { id: true, pseudo: true } } },
      orderBy: { status: "asc" },
    });

    res.status(200).json(invitations);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at getSentInvitationsForEvent controller", error);
  }
}
