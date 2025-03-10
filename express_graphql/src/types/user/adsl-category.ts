import mongoose from "mongoose";
import { UploadedFile } from "express-fileupload";
import { RequestQueryPaginationWithSearch } from "../general";

export interface CategoryType {
  name: string;
  slug: string;
  palette: string;
  type: string;
  photo: string;
}

export type CategoryDocument = CategoryType & mongoose.Document;

export type AddCategoryType = Omit<CategoryType, "photo" | "slug">;

export enum CategoryTypes {
  SERVICE = "سرویس",
  VOLUME = "حجم"
}

export interface EditCategoryType {
  data: AddCategoryType;
  id: string;
}

export interface GetCategoryType {
  paramId: string;
  userId: string;
}

export interface GetCategoriesType extends RequestQueryPaginationWithSearch {}

export interface UploadCategoryPhotoType {
  file: UploadedFile;
  id: string;
}
