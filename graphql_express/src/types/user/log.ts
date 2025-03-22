import mongoose, { SchemaTimestampsConfig } from "mongoose";
import { EVENT_MESSAGES, EVENT_TYPES } from "src/utils/constants";
import { UserDocument } from "src/types";

export interface LogDocument extends mongoose.Document {
  comment: string;
  user?: mongoose.Types.ObjectId | UserDocument;
  eventType: EVENT_TYPES;
  event: EVENT_MESSAGES;
  oldItem?: string;
  newItem?: string;
}

export interface LogTypeWithTimestamp
  extends LogDocument,
    SchemaTimestampsConfig {}

export interface AgentLogDocument extends mongoose.Document {
  comment: string;
  eventType: EVENT_TYPES;
  event: EVENT_MESSAGES;
  oldItem?: string;
  newItem?: string;
}

export interface AgentLogTypeWithTimestamp
  extends AgentLogDocument,
    SchemaTimestampsConfig {}
