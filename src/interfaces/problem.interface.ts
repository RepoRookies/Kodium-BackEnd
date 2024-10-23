import mongoose, { Document } from "mongoose";

export interface IProblemData extends Document {
  displayName:string,
  title: string;
  difficulty: string;
  tags: string[];
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  timeLimit: number,
  memoryLimit: number,
  exampleTestCases: {
    input: string;
    output: string;
  }[];
  actualTestCases: {
    input: string;
    output: string;
  }[]
  hints: string[];
  submissions: {
    userId: mongoose.Types.ObjectId;
    language: string;
    program: string;
    verdict: number;
  }[];
}