import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import userRouter from "./routes/userRoutes.js";
import sortieRouter from "./routes/sortieRoute.js";

dotenv.config();
const port = process.env.PORT || 3000
const app = express();

app.use(express.json())
app.use("/api/users", userRouter);
app.use("/api/sorties", sortieRouter);


connectDB().then(() => {
  app.listen(port, () => {
    console.log("SERVER STARTED ON PORT : ", port);
  });
});