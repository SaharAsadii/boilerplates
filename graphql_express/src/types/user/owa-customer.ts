import { RequestQueryPaginationWithSearch } from "../general";
import { CommentType, SortOrder } from ".";
import mongoose from "mongoose";

export interface OwaCustomerType {
  mobile: string;
  number: string;
  fullName: string;
  nationalCode?: string;
  email?: string;
  birthDate?: string;
  fatherName?: string;
  address: string;
  panel?: string;
  comments: CommentType[];
}

export type OwaCustomerDocument = mongoose.Document & OwaCustomerType;

export interface AddOwaCustomerType extends Omit<OwaCustomerType, "comments"> {
  comment?: string;
}

export interface EditOwaCustomerType {
  data: OwaCustomerType;
  id: string;
}

export interface GetOwaCustomerType {
  paramId: string;
  userId: string;
}

export interface OwaCustomerRequestQuery
  extends RequestQueryPaginationWithSearch {
  sortBy?: string;
  sortOrder?: SortOrder;
}
