import prisma from "../config/prisma.js";

export async function createMessage(req, res) {
  try {
    const { content, groupId, senderId } = req.body;
    if (!groupId)
      res.status(400).json({
        message: "groupId is required",
      });
    if (!content)
      res.status(400).json({
        message: "content is required",
      });

    const message = await prisma.message.create({
      data: {
        content,
        groupId,
        senderId,
      },
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at createMessage controller ", error);
  }
}

export async function getMessage(req, res) {
  try {
    const message = await prisma.message.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at getMessage controller ", error);
  }
}

export async function getMessages(req, res) {
  try {
    const messages = await prisma.message.findMany();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at getMessages controller ", error);
  }
}

export async function updateMessage(req, res) {
  try {
    const { content, groupId, senderId } = req.body;
    if (!content) res.status(400).json({ message: "Content is required" });
    const updatedMessage = await prisma.message.update({
      where: {
        id: req.params.id,
      },
      data: {
        content,
        groupId,
        senderId,
      },
    });
    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at updateMessage controller ", error);
  }
}

export async function deleteMessage(req, res) {
  try {
    await prisma.message.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at deleteMessage controller ", error);
  }
}
