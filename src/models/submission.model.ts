import mongoose, { Model, Schema } from 'mongoose';
import { ISubmissionData } from '../interfaces/submission.interface';

const SubmissionSchema : Schema<ISubmissionData> = new Schema({
      username: {
        type: String,
        required: true,
      },
      problemTitle: {
        type: String,
        required: true,
      },
      problemName: {
        type: String,
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
      difficulty:{
        type:String,
        required:true
      }
},{
  timestamps:true
})

const Submission: Model<ISubmissionData> = mongoose.model<ISubmissionData>(
    "Submission",
    SubmissionSchema
)
export {Submission}