import mongoose from "mongoose";

export interface CanceledSellType {
  uuid: number;
  accountingTransactionDocument: string;
  number: number;
  depositDateToVirtualBank: string;
  price: number;
  refId: string;
  cardNumber: string;
  payDate: string;
  trackingCode: string;
}

export type CanceledSellDocument = mongoose.Document & CanceledSellType;

export interface EditCanceledSellType {
  data: CanceledSellType;
  id: string;
}

export interface GetCanceledSellType {
  paramId: string;
  userId: string;
}
