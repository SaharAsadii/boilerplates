import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { ErrorResponse } from "src/utils/error-response";
import { USER_ROLES } from "src/types";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("ایمیل معتبر نمی باشد")
    .trim()
    .required("ایمیل الزامی می باشد"),
  password: yup
    .string()
    .required("پسوورد الزامی می باشد")
    .min(8, "حداقل تعداد کاراکتر ۸ می باشد"),
  mobileNumber: yup
    .string()
    .required("شماره موبایل الزامی می باشد")
    .min(11, "شماره موبایل صحیح نمی باشد")
    .max(11, "شماره موبایل صحیح نمی باشد"),
  fullName: yup.string().trim().required("نام کامل الزامی می باشد"),
  nationalCode: yup
    .string()
    .trim()
    .min(10, "نعداد ارقام کد ملی صحیح نمی باشد")
    .max(10, "نعداد ارقام کد ملی صحیح نمی باشد"),
  address: yup.string().trim(),
  role: yup.mixed<USER_ROLES>().oneOf(Object.values(USER_ROLES))
});

const smsPanelSchema = yup.object().shape({
  API_KEY: yup.string().trim().required("کلید پنل ابزامی می باشد"),
  panelNumber: yup.number().required("شماره پنل الزامی می باشد")
});

const createUserSchema = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const isValid = await schema.validate(req.body, { stripUnknown: true });
    req.body = isValid;
    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(new ErrorResponse(error.errors.join(","), 400, "schema-error"));
  }
};

const updateUserSchema = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const isValid = await schema
      .omit(["password"])
      .validate(req.body, { stripUnknown: true });
    req.body = isValid;

    await yup.string().required().trim().validate(req.params.id);
    next();
    return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(new ErrorResponse(error.errors.join(","), 400, "schema-error"));
  }
};

const checkSmsPanelSchema = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const isValid = await smsPanelSchema.validate(req.body, {
      stripUnknown: true
    });
    req.body = isValid;
    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(new ErrorResponse(error.errors.join(","), 400, "schema-error"));
  }
};

const changePasswordSchema = yup.object().shape({
  password: yup.string().required("رمز عبور الزامی است")
});

const changeUserPasswordSchema = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const isValid = await changePasswordSchema.validate(req.body, {
      stripUnknown: true
    });
    req.body = isValid;

    await yup.string().required().trim().validate(req.params.userId);
    next();
    return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(new ErrorResponse(error.errors.join(","), 400, "schema-error"));
  }
};

export {
  createUserSchema,
  updateUserSchema,
  checkSmsPanelSchema,
  changeUserPasswordSchema
};
