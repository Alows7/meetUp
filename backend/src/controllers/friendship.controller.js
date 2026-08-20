import prisma from "../config/prisma.js";

export async function createFriendship(req, res) {
  try {
    const { requesterId, addresseeId } = req.body;
    const friendship = await prisma.friendship.create({
      data: {
        requesterId,
        addresseeId,
      },
    });
    res.status(201).json(friendship);
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    console.log("Error at createFriendShip controller ", error);
  }
}
export async function getFriendships(req, res) {
  try {
    const friendships = await prisma.friendship.findMany();
    if(!friendships) res.json({message: "No friendships found"});
    res.status(200).json(friendships);
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    console.log("Error at getFriendShips controller ", error);
  }
}
export async function getFriendship(req, res) {
  try {
    const friendship = await prisma.friendship.findUnique({
      where: {
        id: req.params.id
      }
    });
    if(!friendship) res.json({message: "No friendship found"});
    res.status(200).json(friendship);
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    console.log("Error at getFriendShip controller ", error);
  }
}
export async function updateFriendship(req, res) {
  try {
    const { requesterId, addresseeId } = req.body;
    const friendship = await prisma.friendship.update({
      where:{
        id: req.params.id,
      },
      data: {
        requesterId: requesterId,
        addresseeId: addresseeId,
      },
    });
    res.status(200).json({message: "friendship updated successfully"});
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    console.log("Error at updateFriendship controller ", error);
  }
}
export async function deleteFriendship(req, res) {
  try {
    await prisma.friendship.delete({
      where:{
        id: req.params.id
      }
    })
    res.status(200).json({
      message : "Friendship deleted successfully"
    });
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
    console.log("Error at deleteFriendShip controller ", error);
  }
}
