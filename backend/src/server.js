import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import userRouter from "./routes/user.routes.js";
import eventRouter from "./routes/event.routes.js";

dotenv.config();
const port = process.env.PORT || 3000
const app = express();

app.use(express.json())
app.use(cors());
app.use("/api/users", userRouter);
app.use("/api/events", eventRouter)

app.listen(port, ()=>{
  console.log("serveur lancé avec succès")
})