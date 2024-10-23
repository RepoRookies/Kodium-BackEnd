import mongoose, { Document } from "mongoose";

export interface ISubmissionData extends Document {
    userId: mongoose.Types.ObjectId,
    problemId: mongoose.Types.ObjectId,
    language: string,
    program: string,
    verdict: string,
}

export interface ISubmissionRequest extends Document {
    userId: mongoose.Types.ObjectId,
    problemId: mongoose.Types.ObjectId,
    language: string,
    program: string,
}