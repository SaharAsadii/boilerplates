export * from "./error-types";

import { authErrors } from "src/utils/errors/auth-errors";
import { dataBaseErrors } from "src/utils/errors/database-error";
import { generalErrors } from "src/utils/errors/general-errors";
import { fileErrors } from "./file-errors";


export interface ErrorValueSchema {
  message: string;
  statusCode: number;
  type: string;
}

export const errors = new Map([
  ...generalErrors,
  ...authErrors,
  ...dataBaseErrors,
  ...fileErrors,
]);
