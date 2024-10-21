import mongoose, { Schema, Model } from 'mongoose';
import { IContestData } from '../interfaces/contest.interface';

const ContestSchema: Schema<IContestData> = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  problems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  ],
});

const Contest: Model<IContestData> = mongoose.model<IContestData>(
  'Contest',
  ContestSchema
);

export default Contest;
