export interface ConstantType {
  type: ConstantTypeEnum;
  ranzehPrice: number;
  panel: string[];
  acquaintance: string[];
  channels: string[];
  valueAddedTax: number;
  invoiceNotificationUsers: string[];
  salesStatisticsPanels: string[];
  defaultPanel?: string;
  productNames: string[];
  smsSettings?: SmsSettingsType[];
  registerCommission?: number;
  extendCommission?: number;
  shopValueAddedAgent?: number;
  shopValueAddedCustomer?: number;
}

type SmsSettingsType = {
  name: SmsSectionsEnum;
  enabled: boolean;
};

export enum ConstantTypeEnum {
  INVOICE = "invoice",
  NOTIFICATION = "notification",
  SALES = "sales",
  SMS = "sms",
  Agent = "agent",
  Customer = "customer"
}

export type AddConstantType = Omit<ConstantType, "type">;

export enum NotificationReceiverTypeEnum {
  SELL_INVOICE = "SELL_INVOICE"
}

export enum SmsSectionsEnum {
  CREATE_INVOICE = "ارسال sms بخش ایجاد فاکتور فروش",
  CREATE_BULK_INVOICE = "ارسال sms بخش ایجاد فاکتور انبوه فروش",
  CREATE_BULK_INVOICE_WITH_TIME = "ارسال sms  فاکتور انبوه بعد از زمان مشخص",
  ALL = "ارسال sms"
}
