import mongoose from "mongoose";

export interface CounterDocument extends mongoose.Document {
  sequenceName: SequenceNameEnum;
  sequenceValue: number;
}

export enum SequenceNameEnum {
  INVOICE_SEQUENCE = "invoice_sequence",
  CANCELED_INVOICE_SEQUENCE = "canceled_invoice_sequence",
  PRODUCT_SEQUENCE = "product_sequence",
  CANCELED_SELL_SEQUENCE = "canceled_sell_sequence",
  PIN_SEQUENCE = "pin_sequence",
  SHOP_INVOICE_SEQUENCE = "shop_invoice_sequence"
}
