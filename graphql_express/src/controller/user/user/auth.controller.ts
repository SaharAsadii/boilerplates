import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "src/middleware";
import {
  changePasswordService,
  forgetPasswordService,
  regenerateForgetPasswordCodeService,
  resetPasswordService,
  userLoginService
} from "src/service";
import { deleteUserOnRedis, saveUserOnRedis } from "src/services.micro";
import {
  ChangePasswordBody,
  ChangePasswordQuery,
  ForgetPasswordQuery,
  RequestBody,
  RequestParams,
  ResponseBody,
  UserDocument
} from "src/types";
import { EVENT_MESSAGES, EVENT_TYPES } from "src/utils/constants";

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await userLoginService(
      { username: req.body.username, password: req.body.password },
      next
    );

    if (data) {
      const { user, token } = data;
      await saveUserOnRedis({ redis: global.redis, user }, next);
      req.app.emit(EVENT_TYPES.USER_EVENT_TYPES, {
        event: EVENT_MESSAGES.USER_LOGIN,
        comment: `ورود به سیستم برای یوزر ${user.fullName}`,
        user: user._id
      });
      return res.status(200).json({ data: { token } });
    }
  }
);

export const forgetPassword = asyncHandler(
  async (
    req: Request<RequestParams, ResponseBody, RequestBody, ForgetPasswordQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const { username } = req.query;
    const user = await forgetPasswordService(username, next);
    if (user) {
      req.app.emit(EVENT_TYPES.USER_EVENT_TYPES, {
        event: EVENT_MESSAGES.USER_FORGET_PASSWORD_REQUEST,
        comment: `درخواست تغییر رمز عبور برای ${user.fullName}`,
        user: user.id
      });
      res.status(200).json({
        data: { _id: user.id }
      });
    }
  }
);

export const resetPassword = asyncHandler(
  async (
    req: Request<RequestParams, ResponseBody, RequestBody, ChangePasswordQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const { code, password } = req.query;

    const user = await resetPasswordService({ code, password }, next);
    if (user) {
      req.app.emit(EVENT_TYPES.USER_EVENT_TYPES, {
        event: EVENT_MESSAGES.USER_RESET_PASSWORD,
        comment: `تغییر رمز عبور برای کاربر ${user.fullName}`,
        user: user.id
      });
      res.status(200).json({
        data: "رمز عبور با موفقیت تغییر یافت"
      });
    }
  }
);

export const changePassword = asyncHandler(
  async (
    req: Request<ChangePasswordBody> & { user: UserDocument },
    res: Response,
    next: NextFunction
  ) => {
    const { password } = req.body;

    const user = await changePasswordService(
      { userId: req.user._id, password },
      next
    );
    if (user) {
      await deleteUserOnRedis({ redis: global.redis, user }, next);
      req.app.emit(EVENT_TYPES.USER_EVENT_TYPES, {
        event: EVENT_MESSAGES.USER_CHANGE_PASSWORD,
        comment: `تغییر رمز عبور برای کاربر ${user.fullName}`,
        user: user.id
      });
      res.status(200).json({
        data: "رمز عبور با موفقیت تغییر یافت"
      });
    }
  }
);

export const regenerateForgetPasswordCode = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await regenerateForgetPasswordCodeService(req.params.id, next);
    if (user) {
      req.app.emit(EVENT_TYPES.USER_EVENT_TYPES, {
        event: EVENT_MESSAGES.USER_RESET_PASSWORD_REGENERATE_CODE,
        comment: `ارسال دوباره کد بازیابی رمز عبور  برای ${user.fullName}`,
        user: user._id
      });
      res.status(200).json({ status: 200 });
    }
  }
);
