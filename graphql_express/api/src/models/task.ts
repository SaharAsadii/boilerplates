import { Schema, Document, model } from "mongoose";

export interface ITask extends Document {
  title: string;
  completed: boolean;
}

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default model<ITask>("Task", TaskSchema);
