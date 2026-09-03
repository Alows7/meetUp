import prisma from "../config/prisma.js";

export async function createFriendship(req, res) {
  try {
    const { addresseeId } = req.body;
    const requesterId = req.user.id;
    if (!requesterId || !addresseeId)
      return res
        .status(400)
        .json({ message: "requester and addressee are required" });
    const friendship = await prisma.friendship.create({
      data: {
        addresseeId,
        requesterId,
      },
      include: {
        requester: { select: { id: true, pseudo: true } },
        addressee: { select: { id: true, pseudo: true } },
      },
    });
    res.status(201).json(friendship);
  } catch (error) {
    if (error.code === "P2002")
      return res
        .status(409)
        .json({ message: "Friendship already sent or exist" });
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at createFriendShip controller ", error);
  }
}

export async function getFriendship(req, res) {
  try {
    const friendship = await prisma.friendship.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        requester: { select: { id: true, pseudo: true } },
        addressee: { select: { id: true, pseudo: true } },
      },
    });
    if (!friendship)
      return res.status(404).json({ message: "Friendship not found" });
    res.status(200).json(friendship);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at getFriendShip controller ", error);
  }
}

export async function deleteFriendship(req, res) {
  try {
    await prisma.friendship.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      message: "Friendship deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at deleteFriendShip controller ", error);
  }
}

export async function respondToFriendship(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["ACCEPTED", "DECLINED"].includes(status)) {
      console.log(status);
      return res.status(400).json({ message: "invalid status" });
    }

    const friendship = await prisma.friendship.update({
      where: { id },
      data: { status },
    });
    res.status(200).json(friendship);
  } catch (error) {
    if (error.code === "P2025")
      return res.status(404).json({ message: "friendship not found" });
    res.status(500).json({ message: "Internal server erreur" });
    console.log("Error at respondToFriendship controller : \n", error);
  }
}

export async function getFriends(req, res) {
  try {
    const userId = req.user.id;
    const friendships = await prisma.friendship.findMany({
      where: {
        status: "ACCEPTED",
        OR: [{ addresseeId: userId }, { requesterId: userId }],
      },
      include: {
        requester: { select: { id: true, pseudo: true } },
        addressee: { select: { id: true, pseudo: true } },
      },
    });

    const friends = friendships.map((f) => {
      return f.requesterId === userId ? f.addressee : f.requester;
    });
    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at getFriends controller", error);
  }
}

export async function getPendingRequests(req, res) {
  try {
    const userId = req.user.id;
    const requests = await prisma.friendship.findMany({
      where: { addresseeId: userId, status: "PENDING" },
      include: { requester: { select: { id: true, pseudo: true } } },
    });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at getPendingRequests controller", error);
  }
}
