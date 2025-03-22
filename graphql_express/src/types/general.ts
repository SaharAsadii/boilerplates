import { UserDocument } from "src/types";

export interface RequestParams {}

export interface ResponseBody {}

export interface RequestBody {}

export interface RequestQueryPaginationWithSearch {
  search?: string;
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  user?: UserDocument;
  startDate?: string;
  endDate?: string;
  eventType?: string;
  event?: string;
}

export enum SortOrder {
  "ASC" = 1,
  "DESC" = -1
}

export interface RequestParamsId {
  id: string;
}

export type ExpiredType = "true" | "false";

export interface PhotoUploadRequestParams {
  photoId: string;
}

export type ChatProps = {
  message: string;
  title?: string;
  link?: string;
  image?: string;
  type: ChatType;
};

export enum ChatType {
  INVOICE = "INVOICE",
  REPORT = "REPORT",
  TASK = "TASK",
  ONLINE_ASIATECHPAYMENT = "ONLINE_ASIATECHPAYMENT"
}
