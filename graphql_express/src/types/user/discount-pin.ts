import { ExpiredType, RequestQueryPaginationWithSearch } from "../general";
import mongoose from "mongoose";

export interface DiscountPinType {
  pin: string;
  amount: number;
  percentage: boolean;
  status: DiscountPinStatusEnum;
  expireDate: Date | string;
  comment: string;
}
export type DiscountPinDocument = mongoose.Document & DiscountPinType;

export enum DiscountPinStatusEnum {
  USED = "استفاده شده",
  UNUSED = "استفاده نشده",
  PERMANENT = "دایمی"
}

export interface EditDiscountPinType {
  data: DiscountPinType;
  id: string;
}

export interface GetDiscountPinsType extends RequestQueryPaginationWithSearch {
  expired?: ExpiredType;
  status?: DiscountPinStatusEnum;
}
