import mongoose from "mongoose";
import { CategoryDocument } from "src/types";
import { UploadedFile } from "express-fileupload";
import { RequestQueryPaginationWithSearch } from "../general";
import { SortOrder } from ".";

export interface AdslServiceType {
  name: string;
  serviceVolume: string;
  span: number;
  volume: number;
  bandWidth: number;
  onlySignup: boolean;
  onlyExtend: boolean;
  onlyAdmin: boolean;
  price: number;
  volumePerMonth: number;
  pricePerMonth: number;
  categoryId: CategoryDocument | mongoose.Types.ObjectId;
  order?: number;
  registerCommission?: number;
  extendCommission?: number;
  agentsBlackList?: string[];
}

export type AdslServiceDocument = mongoose.Document & AdslServiceType;

export type AddServiceType = Omit<
  AdslServiceType,
  "pricePerMonth" | "volumePerMonth"
>;

export interface EditServiceType {
  data: AddServiceType;
  id: string;
}

export interface GetServiceType {
  paramId: string;
  userId: string;
}

export interface UploadServicePhotoType {
  file: UploadedFile;
  id: string;
}

export interface CategoryRequestQuery extends RequestQueryPaginationWithSearch {
  categoryId?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
  span?: number;
  bandWidth?: number;
}

export interface PublicAdslQuery {
  categoryId?: string;
  span?: number;
  bandWidth?: number;
  minPrice?: number;
  maxPrice?: number;
  minVolume?: number;
  maxVolume?: number;
  search?: string;
  onlySignup?: boolean;
  onlyExtend?: boolean;
  agentId: string;
}
