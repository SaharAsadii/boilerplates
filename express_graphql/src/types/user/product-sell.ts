import mongoose from "mongoose";

export interface ProductSellType {
  uuid: number;
  accountingTransactionDocument: string;
  name: string;
  sellDate: string;
  price: number;
  count: number;
  fullName: string;
  receiveDate: string;
  isDebtor: boolean;
  official: boolean;
  officialCode: string;
  description: string;
}

export type ProductSellDocument = mongoose.Document & ProductSellType;

export interface EditProductSellType {
  data: ProductSellType;
  id: string;
}

export interface GetProductSellType {
  paramId: string;
  userId: string;
}
