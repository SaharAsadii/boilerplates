import mongoose from "mongoose";
import { RequestQueryPaginationWithSearch } from "../general";
import { DiscountPinType, SortOrder } from ".";

export type InvoiceRowDocument = {
  uuid: number;
  invoiceType: InvoiceTypeEnum;
  total: number;
  manualDiscount: ManualDiscount;
  discountPin?: mongoose.Types.ObjectId;
  submittedBy: SubmittedByType;
  valueAddedTaxAmount: number;
  valueAddedTax: number;
  netPrice: number;
  status: InvoiceStatusEnum;
  comments: CommentType[];
  userPayment?: UserPaymentType;
  asiatechPayment?: AsiatechPaymentType;
  createdAt?: Date;
  canceledInvoiceDetail?: RefundType;
  tehranDirectPayment?: TehranDirectPayment;
  panel?: string;
  numberOfConfirmedSms?: number;
  isBulk?: boolean;
};

export interface TehranDirectPayment {
  isDirectLink: boolean;
  paymentLink: string;
  isPaymentVerified: boolean;
}

export type InvoiceDocument = InvoiceRowDocument &
  mongoose.Document &
  ExtendedInvoiceType;

export type RefundType = {
  canceledInvoiceId?: mongoose.Types.ObjectId;
  status: boolean;
  oldStatus: InvoiceStatusEnum;
};

export type AdslInvoiceType = {
  serviceType: ServiceTypeEnum.ADSL;
  adslInfo: AdslInfoType;
};
export type TdlteInvoiceType = {
  serviceType: ServiceTypeEnum.TDLTE;
  tdlteInfo: TdlteInfoType;
};
export type OwaInvoiceType = {
  serviceType: ServiceTypeEnum.OWA;
  owaInfo: OwaInfoType;
};
export type AsiatellInvoiceType = {
  serviceType: ServiceTypeEnum.ASIATELL;
  asiatellInfo: AsiatellInfoType;
};

export type ExtendedInvoiceType =
  | AdslInvoiceType
  | TdlteInvoiceType
  | OwaInvoiceType
  | AsiatellInvoiceType;

// -------------- User Payment -----------------
export interface UserPaymentType {
  amount: number;
  paymentType: PaymentType[];
  receivedDate: string;
  submittedBy: PaymentSubmittedByType;
  comment: string;
  sellingCode?: number;
  creditor?: number;
}

export interface CommentType {
  userId?: string;
  desc: string;
}

export interface PurchaseDataType {
  cardHash: string;
  cardPan: string;
  refId: number;
  payDate?: Date;
}

export interface PaymentType {
  amount: number;
  paymentMethod: UserPaymentMethodEnum;
  description?: string;
  purchaseData?: PurchaseDataType;
}

export interface PaymentSubmittedByType {
  userId: mongoose.Types.ObjectId | null;
  agentId: mongoose.Types.ObjectId | null;
  type: SubmittedByEnum;
}

export enum InvoiceStatusEnum {
  PENDING_USER_PAYMENT = "PENDING_USER_PAYMENT",
  PENDING_ASIATECH_PAYMENT = "PENDING_ASIATECH_PAYMENT",
  PENDING_ADMIN_APPROVAL = "PENDING_ADMIN_APPROVAL",
  PENDING_ACCOUNTING = "PENDING_ACCOUNTING",
  DONE = "DONE"
}

export enum UserPaymentMethodEnum {
  ONLINE = "آنلاین",
  DEBTOR = "بدهکار",
  CARD_READER = "کارت خوان",
  CASH = "نقد",
  CARD = "کارت به کارت",
  TEHRAN_DIRECT_PAYMENT = "پرداخت مستقیم به تهران"
}

// --------------Invoice Create ----------------
export interface ManualDiscount {
  discountPercentage: number;
  discountAmount: number;
}
export interface SubmittedByType {
  userId: mongoose.Types.ObjectId | null;
  agentId: mongoose.Types.ObjectId | null;
  type: SubmittedByEnum;
  customerId?: mongoose.Types.ObjectId | null;
}

export interface AdslInfoType {
  customerId: mongoose.Types.ObjectId;
  acquaintance: string;
  categoryInfo: { type: string; name: string };
  serviceInfo: AdslServiceInfo;
  ranzehPrice: number;
}

export interface TdlteInfoType {
  customerId: mongoose.Types.ObjectId;
  serviceInfo: TdlteServiceInfo;
  acquaintance: string;
}

export interface OwaInfoType {
  customerId: mongoose.Types.ObjectId;
  acquaintance: string;
  serviceInfo: OwaServiceInfo;
}

export interface AsiatellInfoType {
  customerId: mongoose.Types.ObjectId;
  acquaintance: string;
  serviceInfo: AsiatellServiceInfo;
}

export interface TdlteServiceInfo {
  name: string;
  span: number;
  volume: number;
  price: number;
}

export interface AdslServiceInfo {
  name: string;
  serviceVolume: string;
  span: number;
  volume: number;
  bandWidth: number;
  price: number;
  pricePerMonth: number;
}

export interface OwaServiceInfo {
  name: string;
  span: number;
  volume: number;
  bandWidth: number;
  price: number;
}

export interface AsiatellServiceInfo {
  name: string;
  price: number;
}

export enum ServiceTypeEnum {
  ADSL = "ADSL",
  OWA = "OWA",
  TDLTE = "TD_LTE",
  ASIATELL = "ASIATEL"
}

export enum InvoiceTypeEnum {
  SIGNUP = "ثبت نام",
  EXTEND = "تمدید"
}

export enum SubmittedByEnum {
  ADMIN_PANEL = "admin-panel",
  AGENT_PANEL = "agent-panel",
  ASIATECHIN_WWW = "asiatechin-www",
  ONLINE = "online"
}

export interface AsiatechPaymentType {
  amount: number;
  paymentType: AsiatechPaymentTypeType[];
  receivedDate: string;
  submittedBy: PaymentSubmittedByType;
  comment: string;
  creditor?: number;
}

export enum AsiatechPaymentMethodEnum {
  ONLINE = "آنلاین",
  PIN = "پین",
  VIRTUAL = "مجازی",
  TEHRAN_DIRECT_PAYMENT = "پرداخت مستقیم به تهران"
}
export interface AsiatechPaymentTypeType {
  amount: number;
  paymentMethod: AsiatechPaymentMethodEnum;
  description?: string;
  uuid: string;
  confirm?: boolean;
  buyingCode?: number;
}

export interface InvoiceRequestParamsId {
  invoiceId: string;
}

export interface GetServiceInfoQuery {
  discountPin?: string;
  serviceId: string;
}

export interface InvoiceRequestParamsRefId {
  refId: string;
}

export enum PaymentStatusEnum {
  SETTLED = "تسویه شده",
  DEBTOR = "بدهکار"
}

export enum HesabFaFieldEnum {
  ONLINE = "آنلاین",
  PIN = "پین",
  VIRTUAL = "مجازی",
  SELL = "فروش"
}

export interface InvoiceRequestParamsUuid {
  uuid: string;
}

export type UserRefundPaymentDetail = {
  accountingTransactionDocument: string;
  cardNumber: string;
  payDate: string;
  trackingCode: string;
};

export enum AsiatechRefundPaymentMethods {
  ONLINE = "آنلاین",
  PIN = "پین",
  VIRTUAL = "مجازی"
}

export type AsiatechRefundDetail = {
  price: number;
  accountingTransactionDocument: string;
  payDate: string;
  trackingCode: string;
  paymentMethod: AsiatechRefundPaymentMethods;
};

export type CanceledInvoiceType = {
  uuid: number;
  isAsiatechPaymentDone: boolean;
  userRefundPaymentDetail?: UserRefundPaymentDetail;
  asiatechRefundDetail?: AsiatechRefundDetail[];
  netPrice: number;
  invoiceId: mongoose.Types.ObjectId;
  mobile?: string;
  number: string;
  fullName: string;
  nationalCode?: string;
};

export type InvoiceType = InvoiceRowDocument & ExtendedInvoiceType;

export type InvoiceTypeWithApproved = InvoiceRowDocument &
  ExtendedInvoiceType & { approved: boolean };

export interface AddAdslPanelInvoiceType {
  serviceId: string;
  adslCustomerId: string;
  invoiceType: InvoiceTypeEnum;
  acquaintance: string;
  discountPercentage: number;
  comment?: string;
}

export interface AddTdltePanelInvoiceType {
  serviceId: string;
  tdlteCustomerId: string;
  invoiceType: InvoiceTypeEnum;
  discountPercentage: number;
  acquaintance: string;
  comment?: string;
}

export interface AddOwaPanelInvoiceType {
  serviceId: string;
  owaCustomerId: string;
  invoiceType: InvoiceTypeEnum;
  discountPercentage: number;
  acquaintance: string;
  comment?: string;
}
export interface AddAsiatellPanelInvoiceType {
  asiatellCustomerId: string;
  invoiceType: InvoiceTypeEnum;
  discountPercentage: number;
  servicePrice: number;
  serviceName: string;
  acquaintance: string;
  comment?: string;
}
export interface GetInvoiceType {
  paramId: string;
  userId: string;
}

export interface InvoiceRequestQuery extends RequestQueryPaginationWithSearch {
  sortBy?: string;
  sortOrder?: SortOrder;
  serviceType?: ServiceTypeEnum;
  status?: InvoiceStatusEnum;
  creator?: string;
  paymentMethod?: AsiatechPaymentMethodEnum;
  panel?: string;
  paymentStatus?: PaymentStatusEnum;
  confirm?: boolean;
  startDate?: string;
  endDate?: string;
  agentId?: string;
  isDirectPayment?: "true" | "false";
  agentIds?: string[];
  updateField?: string;
  isPaid?: "true" | "false";
  invoiceType?: InvoiceTypeEnum;
  customerNumber?: string;
}

export interface InvoiceAccountingFields {
  sellingCode: number;
  virtualBuyingCode: number;
  onlineBuyingCode: number;
  pinBuyingCode: number;
}

export interface InvoiceAccountingUpdateField {
  updateField: string;
}

export interface CalculateNetPriceType {
  total: number;
  discountPercentage?: number;
  servicePrice: number;
  valueAddedTaxAmount: number;
  discountPin?: DiscountPinType;
  commission?: number;
}

export interface CalculateDiscountPinAmountType {
  servicePrice: number;
  discountPin?: DiscountPinType;
}

export interface CalculateDiscountAmountType {
  discountPercentage: number;
  servicePrice: number;
}

export interface CalculateTotalType {
  servicePrice: number;
  invoiceType: InvoiceTypeEnum;
  ranzehPrice?: number;
}

export interface CalculateValueAddedTaxAmountType {
  valueAddedTax: number;
  servicePrice: number;
}

export interface InvoiceUpdateStatusRequestQuery {
  invoiceIds: string[];
}

export type InvoiceTypeWithAccounting = InvoiceRowDocument &
  ExtendedInvoiceType & {
    approved: boolean;
    done: boolean;
    sellingCode: number;
    virtualBuyingCode: number;
    pinBuyingCode: number;
    onlineBuyingCode: number;
  };

export type UpdateFieldExcelObject = {
  productCode: string;
  productName: string;
  description: number;
  unit: string;
  count: number;
  unitPrice: number;
  discount: number;
  tax: number;
  totalPrice: number;
};

export enum InvoicePortalType {
  USER = "user",
  AGENT = "agent"
}

export interface CanceledInvoicesRequestQuery
  extends RequestQueryPaginationWithSearch {
  sortBy?: string;
  sortOrder?: SortOrder;
  isAsiatechPaymentDone?: "true" | "false";
}

export interface CanceledInvoiceUserPayment extends UserRefundPaymentDetail {
  amount: number;
  closed: boolean;
}

export interface CanceledInvoiceAsiatechPaymentType
  extends CanceledInvoiceUserPayment {
  asiatechRefundDetail: AsiatechRefundDetail[];
}

export interface AddPublicAdslInvoiceType {
  serviceId: string;
  adslCustomerId: string;
  comment?: string;
  mobile: string;
  number: string;
  fullName: string;
  nationalCode?: string;
  email?: string;
  birthDate?: string;
  fatherName?: string;
  address: string;
  discountPin?: string;
}

export enum OriginOfPaymentRequest {
  WEBSITE_REGISTER = "website-register",
  WEBSITE_EXTEND = "website-extend",
  ADMIN = "admin",
  AGENT = "agent",
  SHOP_AGENT = "shop-agent",
  SHOP_CUSTOMER = "shop-customer"
}

export type CreatePortalParams = {
  invoiceId: string;
  originOfPaymentRequest: OriginOfPaymentRequest;
};

export interface InvoiceUserPaymentData extends UserPaymentType {
  directPaymentLink?: string;
  isDirectPayment?: boolean;
}

export type BulkInvoiceParams = {
  number: string;
  mobile: string;
  fullName: string;
  link: string;
};

export interface CanceledInvoiceRequestParamsId {
  canceledInvoiceId: string;
}

export interface InvoicesDiscountPinQuery {
  discountPinId: string;
}

export type InvoiceChatProps = {
  message: string;
  title?: string;
  link?: string;
};

export type NumberParam = {
  number: string;
};

export type InvoicePanelUpdateQuery = {
  panel: string;
};

export type InvoiceAcquaintanceUpdateQuery = {
  uuid: string;
  number: string;
  acquaintance: string;
};
