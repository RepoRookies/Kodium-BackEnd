import mongoose, { Model, Schema } from 'mongoose';
import { IProblemData } from '../interfaces/problem.interface';

const ProblemSchema: Schema<IProblemData> = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  inputFormat: {
    type: String,
    required: true,
  },
  outputFormat: {
    type: String,
    required: true,
  },
  constraints: {
    type: [String],
    required: true,
  },
  exampleTestCases: [
    {
      input: {
        type: String,
        required: true,
      },
      output: {
        type: String,
        required: true,
      },
    },
  ],
  hints: {
    type: [String],
    required: true,
  },
  submissions: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      language: {
        type: String,
        required: true,
      },
      program: {
        type: String,
        required: true,
      },
      verdict: {
        type: String,
        required: true,
      },
    },
  ],
});

const Problem: Model<IProblemData> = mongoose.model<IProblemData>(
  'Problem',
  ProblemSchema
);

export { Problem };
