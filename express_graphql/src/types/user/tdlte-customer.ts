import { RequestQueryPaginationWithSearch } from "../general";
import { CommentType, SortOrder } from ".";

import mongoose from "mongoose";

export interface TdlteCustomerType {
  mobile: string;
  number: string;
  fullName: string;
  nationalCode?: string;
  email?: string;
  birthDate?: string;
  fatherName?: string;
  address: string;
  modemIMEI: string;
  panel?: string;
  comments: CommentType[];
}
export type TdlteCustomerDocument = mongoose.Document & TdlteCustomerType;

export interface AddTdlteCustomerType
  extends Omit<TdlteCustomerType, "comments"> {
  comment?: string;
}
export interface EditTdlteCustomerType {
  data: TdlteCustomerType;
  id: string;
}

export interface GetTdlteCustomerType {
  paramId: string;
  userId: string;
}

export interface TdlteCustomerRequestQuery
  extends RequestQueryPaginationWithSearch {
  sortBy?: string;
  sortOrder?: SortOrder;
}
