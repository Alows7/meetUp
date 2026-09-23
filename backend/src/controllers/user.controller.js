import prisma from "../config/prisma.js";

// export const getUsers = async (req, res) => {
//   try {
//     const users = await prisma.user.findMany({
//       select: { id: true, email: true, pseudo: true },
//     });
//     res.status(200).json(users);
//   } catch (error) {
//     console.log("Error at getUsers controller");
//   }
// };

export const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
      select: { id: true, email: true, pseudo: true },
    });
    if (!user) return res.status(404).json({ message: "user not found" });
    res.status(200).json(user);
  } catch (error) {
    console.log("Error at getUser controller");
    next(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (req.params.id !== req.user.id)
      return res.status(403).json({ message: "Cannot delete another profil" });
    await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error at deleteUser controllers ");
    next(error);
  }
};
