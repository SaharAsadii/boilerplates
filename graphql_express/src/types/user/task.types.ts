import { UploadedFile } from "express-fileupload";
import mongoose from "mongoose";
import { RequestQueryPaginationWithSearch, SortOrder } from "../general";

export interface TaskType {
  title: string;
  priority: PRIORITY_TYPES;
  assignedTo: mongoose.Types.ObjectId;
  comments: {
    desc: string;
    userId: mongoose.Types.ObjectId;
  }[];
  userId: mongoose.Types.ObjectId;
  albums: {
    title: string;
    path: string;
  }[];
  isSuccessful?: boolean;
}
export type TaskDocument = mongoose.Document & TaskType;

export enum PRIORITY_TYPES {
  ESSENTIAL = "زیاد",
  IMPORTANT = "متوسط",
  NORMAL = "کم"
}

export type AddTaskType = {
  title: string;
  priority: PRIORITY_TYPES;
  description: string;
  albums: {
    title: string;
    path: string;
  }[];
  assignedTo: string;
};
export interface EditTaskType {
  data: AddTaskType;
  id: string;
}

export interface EditTaskTypeParams {
  data: TaskType;
  id: string;
}

export interface GetTaskType {
  paramId: string;
  userId: string;
}

export type ChangeAssignedToParams = {
  taskId: string;
  assignedTo: string;
  comments: { desc: string; userId: string }[];
};

export type UploadAlbumRequestParams = { taskId: string; title: string };

export interface UploadTaskAlbumType extends UploadAlbumRequestParams {
  file: UploadedFile;
}

export interface TaskRequestQuery extends RequestQueryPaginationWithSearch {
  categoryId?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
  isSuccessful?: "true" | "false";
}
