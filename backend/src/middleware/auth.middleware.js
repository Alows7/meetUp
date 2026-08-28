import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

export async function protectRoute(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer"))
      return res.status(401).json({ message: "Not authentified" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: { id: true, email: true, pseudo: true },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    req.user = user;
    next()
  } catch (error) {
    return res.status(401).json({message: "Token expired or unavailable"})
  }
}
