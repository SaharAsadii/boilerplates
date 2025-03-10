import { RequestQueryPaginationWithSearch } from "../general";
import { CommentType, SortOrder } from ".";
import mongoose from "mongoose";

export interface AsiatellCustomerType {
  mobile: string;
  number: string;
  fullName: string;
  nationalCode?: string;
  email?: string;
  birthDate?: string;
  fatherName?: string;
  address: string;
  comments: CommentType[];
  panel?: string;
}
export type AsiatellCustomerDocument = mongoose.Document & AsiatellCustomerType;

export interface AddAsiatellCustomerType
  extends Omit<AsiatellCustomerType, "comments"> {
  comment?: string;
}

export interface EditAsiatellCustomerType {
  data: AsiatellCustomerType;
  id: string;
}

export interface GetAsiatellCustomerType {
  paramId: string;
  userId: string;
}

export interface AsiatellCustomerRequestQuery
  extends RequestQueryPaginationWithSearch {
  sortBy?: string;
  sortOrder?: SortOrder;
}
