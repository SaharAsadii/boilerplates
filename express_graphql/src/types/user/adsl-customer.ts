import mongoose from "mongoose";
import { RequestQueryPaginationWithSearch } from "../general";
import { CommentType, SortOrder } from ".";

export interface AdslCustomerType {
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
  username?: string;
  password?: string;
  vci?: number;
  vpi?: number;
}
export interface AdslCustomerDocument
  extends mongoose.Document,
    AdslCustomerType {
  smsCode: string;
  smsCodeExpire: Date;
  getSignedJwtToken: () => Promise<string>;
  generateRandomNumericCode: () => string;
}

export interface AddAdslCustomerType
  extends Omit<AdslCustomerType, "comments"> {
  comment?: string;
}

export interface EditAdslCustomerType {
  data: AdslCustomerType;
  id: string;
}

export interface GetAdslCustomerType {
  paramId: string;
  userId: string;
}

export interface AdslCustomerRequestQuery
  extends RequestQueryPaginationWithSearch {
  sortBy?: string;
  sortOrder?: SortOrder;
}
