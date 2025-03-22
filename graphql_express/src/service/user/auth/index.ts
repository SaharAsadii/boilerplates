import { NextFunction } from "express";
import { asyncServiceHandler } from "src/middleware";
import { LoginType, ChangePasswordType, UserDocument } from "src/types";
import { ErrorResponse } from "src/utils/error-response";
import { AUTH_ERROR_TYPES, DATABASE_ERROR_TYPES } from "src/utils/errors";
import { sendTokenResponse } from "src/utils/utility";
import {
  getUserById,
  getUserByMobileOrEmail,
  getUserByResetPasswordCode
} from "../user/user.service";

export const userLoginService = asyncServiceHandler(
  async (
    { username, password }: LoginType,
    next: NextFunction
  ): Promise<{ token: string; user: UserDocument } | void> => {
    const user = await getUserByMobileOrEmail(username);
    if (!user) {
      return next(new ErrorResponse(`${AUTH_ERROR_TYPES.AUTH_PASSWORD}`));
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new ErrorResponse(`${AUTH_ERROR_TYPES.AUTH_PASSWORD}`));
    }
    const token = await sendTokenResponse(user);
    if (token) {
      return { token, user };
    } else {
      return next(
        new ErrorResponse(`${DATABASE_ERROR_TYPES.DATABASE_UNKNOWN}`)
      );
    }
  }
);

export const forgetPasswordService = asyncServiceHandler(
  async (
    username: string,
    next: NextFunction
  ): Promise<UserDocument | void> => {
    const user = await getUserByMobileOrEmail(username);

    if (!user) {
      return next(new ErrorResponse(`${AUTH_ERROR_TYPES.AUTH_NOTFOUND}`));
    }

    user.resetPasswordCode = user.generateRandomNumericCode();

    user.resetPasswordCodeExpire = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    return user;
  }
);

export const resetPasswordService = asyncServiceHandler(
  async (
    {
      code,
      password
    }: {
      code: string;
      password: string;
    },
    next: NextFunction
  ): Promise<void | UserDocument> => {
    const user = await getUserByResetPasswordCode(code);

    if (!user) {
      return next(new ErrorResponse(`${AUTH_ERROR_TYPES.AUTH_EXPIRED}`));
    }
    user.password = password;
    await user.save();
    return user;
  }
);

//each user can change it's password and also a parent can change a user's password as well
export const changePasswordService = asyncServiceHandler(
  async (
    { userId, password }: ChangePasswordType,
    next: NextFunction
  ): Promise<void | UserDocument> => {
    const user = await getUserById(userId);

    if (!user) {
      return next(new ErrorResponse(`${AUTH_ERROR_TYPES.AUTH_NOTFOUND}`));
    }
    user.password = password;
    await user.save();
    return user;
  }
);

export const regenerateForgetPasswordCodeService = asyncServiceHandler(
  async (id: string, next: NextFunction): Promise<UserDocument | void> => {
    const user = await getUserById(id);

    if (!user) {
      return next(new ErrorResponse(`${AUTH_ERROR_TYPES.AUTH_NOTFOUND}`));
    }

    user.resetPasswordCode = user.generateRandomNumericCode();
    user.resetPasswordCodeExpire = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    return user;
  }
);
