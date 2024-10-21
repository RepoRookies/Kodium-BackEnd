import mongoose, { Schema, Model } from 'mongoose';
import { ILearnData } from '../interfaces/learn.interface';

const LearnSchema: Schema<ILearnData> = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Learn: Model<ILearnData> = mongoose.model<ILearnData>(
  'Learn',
  LearnSchema
);

export { Learn };
