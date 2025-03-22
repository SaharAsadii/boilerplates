import { RequestQueryPaginationWithSearch } from "../general";
import { CategoryDocument, SortOrder, CommentType } from ".";
import mongoose from "mongoose";

export interface TdlteServiceType {
  name: string;
  span: number;
  volume: number;
  price: number;
  volumePerMonth: number;
  pricePerMonth: number;
  categoryId: CategoryDocument | mongoose.Types.ObjectId;
  order?: number;
  registerCommission?: number;
  extendCommission?: number;
  comments: CommentType[];
}
export type TdlteServiceDocument = mongoose.Document & TdlteServiceType;

export type AddTdlteServiceType = Omit<
  TdlteServiceType,
  "pricePerMonth" | "volumePerMonth"
>;

export interface EditTdlteServiceType {
  data: AddTdlteServiceType;
  id: string;
}

export interface GetTdlteServiceType {
  paramId: string;
  userId: string;
}

export interface TdlteServiceRequestQuery
  extends RequestQueryPaginationWithSearch {
  sortBy?: string;
  sortOrder?: SortOrder;
  categoryId?: string;
}
