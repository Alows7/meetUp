import prisma from "../config/prisma.js";

export async function createInvitation(req, res) {
  try {
    const {userId, eventId} = req.body;
    const invitation = await prisma.invitation.create({
      data: {
        userId,
        eventId
      }
    });
    res.status(201).json(invitation);
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    console.log("Error at createInvitation controller ", error)
  }
}
export async function getInvitation(req, res) {
  try {
    const invitation = await prisma.invitation.findUnique({
      where: {
        id: req.params.id
      }
    });
    if(!invitation) res.json({message: "No invitation found"});
    res.status(200).json(invitation);
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    console.log("Error at getInvitation controller ", error)
  }
}
export async function getInvitations(req, res) {
  try {
    const invitations = await prisma.invitation.findMany();
    if(!invitations) res.json({
      message: "No invitations found"
    })
    res.status(200).json(invitations);
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    console.log("Error at getInvitations controller ", error)
  }
}
export async function updateInvitation(req, res) {
  try {
    const {userId, eventId} = req.body;
    const invitation = await prisma.invitation.update({
      where: {
        id: req.params.id
      },
      data: {
        userId: userId,
        eventId: eventId
      }
    });
    res.status(200).json(invitation);
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    console.log("Error at updateInvitation controller ", error)
  }
}
export async function deleteInvitation(req, res) {
  try {
    await prisma.invitation.delete({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({message: "Invitation deleted successfully"});
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    console.log("Error at deleteInvitation controller ", error)
  }
}