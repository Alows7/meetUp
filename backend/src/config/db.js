import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export async function connectDB(){
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database !")
  } catch (error) {
    console.log(" Error conecting to database ", error);
    process.exit(1);
  }
}