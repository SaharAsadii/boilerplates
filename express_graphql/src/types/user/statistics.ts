import { ServiceTypeEnum, UserDocument } from "src/types";

export interface InvoiceStatisticsParams {
  startDate: Date;
  endDate: Date;
  serviceType?: ServiceTypeEnum;
  user?: UserDocument;
  salesStatisticsPanels?: string[];
  agentIds?: string[];
  reportType?: ReportType;
}

export interface InvoiceStatisticsParamsWithPanel
  extends InvoiceStatisticsParams {
  salesStatisticsPanels?: string[];
}

export interface SubmittedByWithCount {
  count: number;
  submittedByName: string;
}

export interface PaymentsStatisticsType {
  totalPayments: number;
  paymentMethod: string;
  total: number;
}

export interface PaymentsByInvoiceTypeStatisticsType {
  totalUserPayment: number;
  invoiceType: string;
  total: number;
}

export enum ReportType {
  CREATE_AT_DATE = "createAtDate",
  USER_PAYMENT_DATE = "userPaymentDate",
  ASIATECH_PAYMENT_DATE = "asiatechPaymentDate"
}

export const ReportDateTypeField = new Map([
  [ReportType.CREATE_AT_DATE, "createdAt"],
  [ReportType.USER_PAYMENT_DATE, "userPayment.createdAt"],
  [ReportType.ASIATECH_PAYMENT_DATE, "asiatechPayment.createdAt"],
  [undefined, "createdAt"]
]);
