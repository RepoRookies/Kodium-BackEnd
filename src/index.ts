import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './utils/db';
import dotenv from 'dotenv';

dotenv.config({});

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string) || 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get('/', (_: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World!' });
});

// Routes
const userRoutes = require('./routes/user.routes');
const problemRoutes = require('./routes/problem.routes');
const submissionRoutes = require('./routes/submission.routes')

app.use('/app/v1/user', userRoutes);
app.use('/app/v1/problems', problemRoutes);
app.use('/app/v1/submission', submissionRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server Running on Port: ${PORT}`);
});

module.exports = app;