import mongoose from "mongoose";

export interface SMSType {
  category: string;
  messages: SMSMessageDocument[];
  message: SMSMessageDocument;
}

export interface SMSMessageDocument extends mongoose.Document {
  message: string;
}

export type SMSDocument = mongoose.Document & SMSType;

export type CreateSmsCategoryType = Pick<SMSType, "category">;

export interface EditSmsCategoryType {
  data: CreateSmsCategoryType;
  id: string;
}

export interface SendSmsReturnType {
  data: { return: string };
}

export enum SmsTemplatesEnum {
  SELL_ADSL_INVOICE = "قالب ارسال فاکتور فروش ADSL",
  SELL_BULK_ADSL_INVOICE = "قالب ارسال فاکتور فروش انبوه ADSL"
}

export interface SmsTemplateType {
  type: SmsTemplatesEnum;
  name: string;
  content: string;
  isDefault: boolean;
}

export interface SmsTemplateDocument
  extends mongoose.Document,
    SmsTemplateType {}

export interface EditSmsTemplateType {
  data: SmsTemplateType;
  id: string;
}

export type InvoiceSmsParams = {
  serviceName: string;
  serviceVolume: string;
  serviceSpan: number;
  netPrice: number;
  number: string;
  fullName: string;
  address: string;
  mobile: string;
  nationalCode: string;
  invoiceId: string;
};
