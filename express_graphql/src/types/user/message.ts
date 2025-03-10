export interface AddSmsMessage extends MessageRequestParams {
  data: MessageRequestType;
}

export interface EditSmsMessage extends MessageRequestParams {
  data: UpdateMessageRequestBody;
}

export interface SendSmsBodyType {
  receiver: string;
  description: string;
}

export interface CreateSmsMessageType extends MessageRequestType {
  smsId: string;
}

export interface SmsMessageTypeParams {
  smsId: string;
  messageId: string;
}

export interface UpdateSmsMessageType
  extends SmsMessageTypeParams,
    MessageRequestType {}

export interface MessageRequestParams {
  id: string;
}

export interface MessageRequestType {
  message: string;
}

export interface UpdateMessageRequestBody
  extends MessageRequestType,
    MessageRequestParams {}
