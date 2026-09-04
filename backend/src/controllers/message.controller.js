import prisma from "../config/prisma.js";

export async function createMessage(req, res) {
  try {
    const { content, groupId } = req.body;
    const senderId = req.user.id;
    if (!groupId || !content)
      return res.status(400).json({
        message: "groupId and content are required",
      });

    const message = await prisma.message.create({
      data: {
        content,
        groupId,
        senderId,
      },
      include: {
        sender: { id: true, pseudo: true },
      },
    });
    res.status(201).json(message);
  } catch (error) {
    console.log("Error at createMessage controller ");
    next(error);
  }
}

export async function getMessages(req, res) {
  try {
    const groupId = req.params.groupId;
    const messages = await prisma.message.findMany({
      where: { groupId },
      include: {
        sender: { id: true, pseudo: true },
      },
      orderBy: { createdAt: "asc" },
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error at getMessages controller ");
    next(error);
  }
}

export async function updateMessage(req, res) {
  try {
    const { content } = req.body;
    if (!content)
      return res.status(400).json({
        message: "content is required",
      });
    const updatedMessage = await prisma.message.update({
      where: { id: req.params.id },
      data: { content },
      include: { sender: { id: true, pseudo: true } },
    });
    res.status(200).json(updatedMessage);
  } catch (error) {
    console.log("Error at updateMessage controller ");
    next(error);
  }
}

export async function deleteMessage(req, res) {
  try {
    await prisma.message.delete({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "message deleted successfully" });
  } catch (error) {
    console.log("Error at deleteMessage controller ");
    next(error);
  }
}
