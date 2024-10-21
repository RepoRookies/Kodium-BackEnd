import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { connectDB } from "./utils/db";
import dotenv from "dotenv";

dotenv.config({});

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string) || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_: Request, res: Response) => {
  return res.send();
});

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.listen(PORT, () => {
  connectDB();
  console.log(`Server Running on port ${PORT}`);
});
