import mongoose, { Document } from 'mongoose';

export interface ILearnData extends Document {
  title: string;
  content: string;
  problemId: mongoose.Types.ObjectId;
}