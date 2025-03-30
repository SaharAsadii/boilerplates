import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  username?: string;
  password: string;
  email: string;
  name: string;
}

const UserSchema = new Schema({
  username: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export default model<IUser>("User", UserSchema);
