import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { ErrorResponse } from "src/utils/error-response";

export const singleFileSchema = yup.object().shape({
  file: yup
    .object()
    .typeError("اطلاعات ارسالی ناقص می باشد")
    .required("فایل خالی است")
    .shape({ name: yup.string().required("فایل ارسال نشده است") })
});

const checkFileSchema = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    req.body = await singleFileSchema.validate(req.files);
    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(new ErrorResponse(error.errors.join(","), 401, "schema-error"));
  }
};

export { checkFileSchema };
