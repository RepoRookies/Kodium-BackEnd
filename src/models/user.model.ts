import mongoose, { Schema, Model } from 'mongoose';
import { IUserData } from '../interfaces/user.interface';

const UserSchema: Schema<IUserData> = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User: Model<IUserData> = mongoose.model<IUserData>('User', UserSchema);

export default User;
