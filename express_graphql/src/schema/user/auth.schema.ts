/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "src/utils/error-response";
import * as yup from "yup";

const schema = yup.object().shape({
  headers: yup.object().shape({
    authorization: yup.string().required("اطلاعات هدر ارسال نشده است")
  })
});

const loginSchema = yup.object().shape({
  username: yup.string().required("موبایل یا ایمیل الزامی است"),
  password: yup.string().required("پسوورد الزامی است")
});

const forgetSchema = yup.object().shape({
  username: yup.string().required("موبایل یا ایمیل الزامی است")
});

const resetSchema = yup.object().shape({
  code: yup.string().required("کد تایید الزامی است"),
  password: yup.string().required("پسوورد الزامی است")
});

const passwordSchema = yup.object().shape({
  userId: yup.string().required("آیدی کاربر الزامی است"),
  password: yup.string().required("پسوورد الزامی است")
});

const protectSchema = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    await schema.validate(req);
    next();
  } catch (error: any) {
    next(new ErrorResponse(error.errors.join(","), 400, "schema-error"));
  }
};

const loginUserSchema = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    req.body = await loginSchema.validate(req.body);
    next();
  } catch (error: any) {
    next(new ErrorResponse(error.errors.join(","), 400, "schema-error"));
  }
};

const forgetPasswordSchema = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    req.body = await forgetSchema.validate(req.query);
    next();
  } catch (error: any) {
    next(new ErrorResponse(error.errors.join(","), 400, "schema-error"));
  }
};

const resetPasswordSchema = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    req.body = await resetSchema.validate(req.query);
    next();
  } catch (error: any) {
    next(new ErrorResponse(error.errors.join(","), 400, "schema-error"));
  }
};
const changePasswordUserSchema = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    req.body = await passwordSchema.omit(["userId"]).validate(req.body);
    next();
  } catch (error: any) {
    next(new ErrorResponse(error.errors.join(","), 400, "schema-error"));
  }
};
const changePasswordAdminSchema = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    req.body = await passwordSchema.validate(req.body);
    next();
  } catch (error: any) {
    next(new ErrorResponse(error.errors.join(","), 400, "schema-error"));
  }
};

export {
  changePasswordAdminSchema,
  changePasswordUserSchema,
  forgetPasswordSchema,
  loginUserSchema,
  protectSchema,
  resetPasswordSchema
};
