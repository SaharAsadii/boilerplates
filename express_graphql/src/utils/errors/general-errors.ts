import { ErrorValueSchema } from ".";
import { GENERAL_ERROR_TYPES } from "./error-types";

export const generalErrors: Map<string, ErrorValueSchema> = new Map([
  [
    GENERAL_ERROR_TYPES.GENERAL_INPUT,
    {
      message: "اطلاعات ارسالی کافی نمی باشد",
      statusCode: 422,
      type: GENERAL_ERROR_TYPES.GENERAL_INPUT
    }
  ],
  [
    GENERAL_ERROR_TYPES.GENERAL_FILETYPE,
    {
      message: "نوع فایل ارسالی صحیح نمی باشد",
      statusCode: 422,
      type: GENERAL_ERROR_TYPES.GENERAL_FILETYPE
    }
  ],
  [
    GENERAL_ERROR_TYPES.GENERAL_FILE_SIZE,
    {
      message: "اندازه فایل بیش از مقدار تعیین شده است",
      statusCode: 422,
      type: GENERAL_ERROR_TYPES.GENERAL_FILE_SIZE
    }
  ],
  [
    GENERAL_ERROR_TYPES.GENERAL_FILE_MOVE,
    {
      message: "اشکال در ذخیره فایل",
      statusCode: 500,
      type: GENERAL_ERROR_TYPES.GENERAL_FILE_MOVE
    }
  ],
  [
    GENERAL_ERROR_TYPES.GENERAL_FILE_REMOVE,
    {
      message: "اشکال در حذف فایل",
      statusCode: 500,
      type: GENERAL_ERROR_TYPES.GENERAL_FILE_REMOVE
    }
  ],
  [
    GENERAL_ERROR_TYPES.GENERAL_FILE_NOTFOUND,
    {
      message: "فایل مورد نظر پیدا نشد",
      statusCode: 400,
      type: GENERAL_ERROR_TYPES.GENERAL_FILE_NOTFOUND
    }
  ],
  [
    GENERAL_ERROR_TYPES.GENERAL_QUERY,
    {
      message: "اشکال در درخواست",
      statusCode: 400,
      type: GENERAL_ERROR_TYPES.GENERAL_QUERY
    }
  ],
  [
    GENERAL_ERROR_TYPES.GENERAL_UNASSIGNABLE,
    {
      message: "امکان ارجاع برای این کاربر میسیر نیست",
      statusCode: 422,
      type: GENERAL_ERROR_TYPES.GENERAL_UNASSIGNABLE
    }
  ],
  [
    GENERAL_ERROR_TYPES.GENERAL_DUPLICATE,
    {
      message: "داده تکراری می باشد",
      statusCode: 400,
      type: GENERAL_ERROR_TYPES.GENERAL_DUPLICATE
    }
  ]
]);
