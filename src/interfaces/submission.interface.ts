import mongoose, { Document } from "mongoose";

export interface ISubmissionData extends Document {
    username: string,
    problemTitle: string,
    problemName:string,
    difficulty:string,
    language: string,
    program: string,
    verdict: string,
}

export interface ISubmissionRequest extends Document {
    problemName:string,
    problemTitle: string,
    difficulty:string,
    language: string,
    program: string,
}


export interface IRunRequest extends Document {
    language: string,
    program: string,
    input:string
}