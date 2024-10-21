import mongoose, { Document } from 'mongoose';

export interface IContestData extends Document {
  name: string;
  date: Date;
  users: mongoose.Types.ObjectId[]; 
  problems: mongoose.Types.ObjectId[]; 
}