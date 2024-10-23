import mongoose, { Model, Schema } from 'mongoose';
import { ISubmissionData } from '../interfaces/submission.interface';

const SubmissionSchema : Schema<ISubmissionData> = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
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
})

const Submission: Model<ISubmissionData> = mongoose.model<ISubmissionData>(
    "Submission",
    SubmissionSchema
)
export {Submission}