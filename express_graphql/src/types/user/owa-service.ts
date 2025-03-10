import { RequestQueryPaginationWithSearch } from "../general";
import { CategoryDocument, SortOrder } from ".";
import mongoose from "mongoose";

export interface OwaServiceType {
  name: string;
  span: number;
  volume: number;
  bandWidth: number;
  price: number;
  volumePerMonth: number;
  pricePerMonth: number;
  categoryId: CategoryDocument | mongoose.Types.ObjectId;
  order?: number;
  registerCommission?: number;
  extendCommission?: number;
}

export type OwaServiceDocument = mongoose.Document & OwaServiceType;

export type AddOwaServiceType = Omit<
  OwaServiceType,
  "pricePerMonth" | "volumePerMonth"
>;

export interface EditOwaServiceType {
  data: AddOwaServiceType;
  id: string;
}

export interface GetOwaServiceType {
  paramId: string;
  userId: string;
}

export interface OwaServiceRequestQuery
  extends RequestQueryPaginationWithSearch {
  sortBy?: string;
  sortOrder?: SortOrder;
  categoryId?: string;
}
