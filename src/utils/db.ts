import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};