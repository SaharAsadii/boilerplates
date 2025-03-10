import mongoose from "mongoose";

export interface ProductPurchaseType {
  uuid: number;
  accountingTransactionDocument: string;
  name: string;
  buyDate: string;
  price: number;
  count: number;
  fullName: string;
  receiveDate: string;
  isDebtor: boolean;
  official: boolean;
  officialCode: string;
  description: string;
}

export type ProductPurchaseDocument = mongoose.Document & ProductPurchaseType;

export interface EditProductPurchaseType {
  data: ProductPurchaseType;
  id: string;
}

export interface GetProductPurchaseType {
  paramId: string;
  userId: string;
}
