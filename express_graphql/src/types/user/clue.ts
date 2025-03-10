import mongoose from "mongoose";
import { ServiceTypeEnum } from "./invoice";
import { RequestQueryPaginationWithSearch } from "../general";

export interface ClueType {
  service: ServiceTypeEnum;
  fullName: string;
  mobileNumber: string;
  address: string;
  isSuccessful: boolean;
  comments: {
    desc: string;
    userId?: mongoose.Types.ObjectId;
  }[];
  userId?: mongoose.Types.ObjectId;
  createdAt?: Date;
  channel: string;
}
export type ClueDocument = mongoose.Document & ClueType;

export type AddClueType = {
  description: string;
  service: ServiceTypeEnum;
  fullName: string;
  mobileNumber: string;
  address: string;
  isSuccessful: boolean;
  userId?: mongoose.Types.ObjectId;
  channel: string;
};
export interface EditClueType {
  data: AddClueType;
  id: string;
}

export interface EditClueTypeParams {
  data: ClueType;
  id: string;
}

export interface GetClueType {
  paramId: string;
  userId: string;
}

export interface BulkClueType extends AddClueType {
  commentedBy: string;
  registrationDate: Date;
  commentDate: Date;
  taskClosingDate: Date;
}

export interface GetClueListType extends RequestQueryPaginationWithSearch {
  isSuccessful?: "true" | "false";
  service?: string;
}
