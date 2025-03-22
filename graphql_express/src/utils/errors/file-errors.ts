import { ErrorValueSchema } from ".";
import { FILE_ERRORS } from "./error-types";

export const fileErrors: Map<string, ErrorValueSchema> = new Map([
  [
    FILE_ERRORS.FILE_SIZE_ERROR,
    {
      message: "خطا در اندازه فایل",
      statusCode: 422,
      type: FILE_ERRORS.FILE_SIZE_ERROR
    }
  ],
  [
    FILE_ERRORS.FILE_TYPE_ERROR,
    {
      message: "خطا در نوع فایل",
      statusCode: 415,
      type: FILE_ERRORS.FILE_TYPE_ERROR
    }
  ],
  [
    FILE_ERRORS.FILE_MOVE_ERROR,
    {
      message: "خطا در انتقال فایل",
      statusCode: 415,
      type: FILE_ERRORS.FILE_MOVE_ERROR
    }
  ],
  [
    FILE_ERRORS.FILE_READ_ERROR,
    {
      message: "خطا در خواندن فایل",
      statusCode: 415,
      type: FILE_ERRORS.FILE_READ_ERROR
    }
  ]
]);
