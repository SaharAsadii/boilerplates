import { ErrorValueSchema } from ".";
import { AUTH_ERROR_TYPES } from "./error-types";

export const authErrors: Map<string, ErrorValueSchema> = new Map([
  [
    AUTH_ERROR_TYPES.AUTH_NO_TOKEN,
    {
      message: "اطلاعات ارسالی کافی نمی باشد",
      statusCode: 422,
      type: AUTH_ERROR_TYPES.AUTH_NO_TOKEN
    }
  ],
  [
    AUTH_ERROR_TYPES.AUTH_PASSWORD,
    {
      message: "نام کاربری و یا رمز عبور صحیح نمی باشد",
      statusCode: 422,
      type: AUTH_ERROR_TYPES.AUTH_PASSWORD
    }
  ],
  [
    AUTH_ERROR_TYPES.AUTH_NOT_LOGIN,
    {
      message: "ابتدا وارد سیستم شوید",
      statusCode: 403,
      type: AUTH_ERROR_TYPES.AUTH_NOT_LOGIN
    }
  ],
  [
    AUTH_ERROR_TYPES.AUTH_NOTFOUND,
    {
      message: "کاربر مورد نظر پیدا نشد",
      statusCode: 404,
      type: AUTH_ERROR_TYPES.AUTH_NOTFOUND
    }
  ],
  [
    AUTH_ERROR_TYPES.AUTH_EXPIRED,
    {
      message: "شناسه منقضی شده است",
      statusCode: 410,
      type: AUTH_ERROR_TYPES.AUTH_EXPIRED
    }
  ],
  [
    AUTH_ERROR_TYPES.AUTH_NOTAUTHORIZED,
    {
      message: "اجازه دسترسی ندارید",
      statusCode: 401,
      type: AUTH_ERROR_TYPES.AUTH_NOTAUTHORIZED
    }
  ]
]);
