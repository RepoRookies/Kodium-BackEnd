import mongoose, { Document } from "mongoose";

export interface IProblemData extends Document {
  title: string;
  difficulty: string;
  tags: string[];
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  exampleTestCases: {
    input: string;
    output: string;
  }[];
  hints: string[];
  submissions: {
    userId: mongoose.Types.ObjectId;
    language: string;
    program: string;
    verdict: number;
  }[];
}