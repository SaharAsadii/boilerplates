import { ErrorValueSchema } from ".";
import { DATABASE_ERROR_TYPES } from "./error-types";

export const dataBaseErrors: Map<string, ErrorValueSchema> = new Map([
  [
    DATABASE_ERROR_TYPES.DATABASE_UNKNOWN,
    {
      message: "خطا در ارتباط با دیتابیس",
      statusCode: 500,
      type: DATABASE_ERROR_TYPES.DATABASE_UNKNOWN
    }
  ],
  [
    DATABASE_ERROR_TYPES.DATABASE_NOTFOUND,
    {
      message: "داده مورد نظر پیدا نشد",
      statusCode: 404,
      type: DATABASE_ERROR_TYPES.DATABASE_NOTFOUND
    }
  ]
]);
