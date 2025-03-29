import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  isActive: boolean;
  username: string;
  password: string;
}

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model<IUser>("User", UserSchema);
