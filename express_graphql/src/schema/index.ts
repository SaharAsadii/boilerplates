import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { ErrorResponse } from "src/utils/error-response";

export * from "./file.schema";
export * from "./search-params.schema";
export * from "./user/index";

export const checkDeleteSubItemSchema = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    await yup
      .object()
      .shape({
        id: yup.string().required("اطلاعات آیتم جهت جهت حذف الزمی می باشد")
      })
      .validate(req.body, {
        stripUnknown: true
      });
    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(new ErrorResponse(error.errors.join(","), 400, "schema-error"));
  }
};
