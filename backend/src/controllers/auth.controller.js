import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import { OAuth2Client } from "google-auth-library";

export async function register(req, res) {
  try {
    const { pseudo, email, password } = req.body;
    if (!email || !password || !pseudo)
      return res
        .status(400)
        .json({ message: "Email, pseudo and password are required" });
    const exist = await prisma.user.findUnique({
      where: { email },
    });
    if (exist) return res.status(409).json({ message: "Email already used" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { pseudo, email, password: hashedPassword },
      select: { id: true, email: true, pseudo: true },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(201).json({ user, token });
  } catch (error) {
    console.log("Error at register controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    if (!typeof email !== "string")
      return res.status(400).json({ message: "Invalid email" });
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user)
      return res.status(401).json({ message: "Incorrect email or password" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(401).json({ message: "Incorrect email or password" });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        pseudo: user.pseudo,
      },
      token,
    });
  } catch (error) {
    console.log("Error at login controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export async function googleAuth(req, res, next) {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ message: "IdToken required" });

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload; // sub = l'id unique Google

    // cherche un compte existant par googleId, sinon par email (fusion de compte)
    let user = await prisma.user.findUnique({ where: { googleId } });

    if (!user) {
      user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        // un compte existait déjà avec cet email (inscrit via mot de passe) → on le relie à Google
        user = await prisma.user.update({
          where: { id: user.id },
          data: { googleId },
        });
      } else {
        // vraiment nouveau compte
        user = await prisma.user.create({
          data: {
            email,
            googleId,
            pseudo: name.replace(/\s/g, "").slice(0, 20), // génère un pseudo de base, à personnaliser plus tard
          },
        });
      }
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      user: { id: user.id, email: user.email, pseudo: user.pseudo },
      token,
    });
  } catch (error) {
    next(error);
  }
}
