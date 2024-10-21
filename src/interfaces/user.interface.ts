import { Document } from "mongoose";

export interface IUserData extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
}