import mongoose, { Document } from 'mongoose';

export interface ILearnData extends Document {
  title: string;
  content: string;
  problem: mongoose.Types.ObjectId;
}