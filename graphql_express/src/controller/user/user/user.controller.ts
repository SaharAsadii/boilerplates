import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { asyncHandler } from "src/middleware";
import { UserDocument } from "src/types";
import {
  changeUserPasswordService,
  createUserService,
  getMeService,
  getUserService,
  getUsersNoAdminService,
  getUsersService,
  updateAccessService,
  updateUserRoleService,
  updateUserService,
  updateUserStatusService,
  uploadFilesUserService
} from "src/service";
import { EVENT_MESSAGES, EVENT_TYPES } from "src/utils/constants";
import { UploadedFile } from "express-fileupload";
import {
  PhotoUploadRequestParams,
  RequestBody,
  RequestParams,
  RequestParamsId,
  RequestQueryPaginationWithSearch,
  ResponseBody
} from "src/types";
import { deleteUserOnRedis } from "src/services.micro";

export const createUser = asyncHandler(
  async (
    req: Request & { user: UserDocument },
    res: Response,
    next: NextFunction
  ) => {
    const user = await createUserService({ data: req.body }, next);
    if (user) {
      req.app.emit(EVENT_TYPES.USER_EVENT_TYPES, {
        event: EVENT_MESSAGES.USER_CREATE_USER,
        comment: `یوزر جدید با شماره موبایل  ${user.mobileNumber} به نام  ${user.fullName} ایجاد شد`,
        user: req.user._id
      });
      res.status(201).json({ data: user });
    }
  }
);

export const updateUser = asyncHandler(
  async (
    req: Request<RequestParamsId> & { user: UserDocument },
    res: Response,
    next: NextFunction
  ) => {
    const user = await updateUserService(
      { id: req.params.id ?? req.user._id, data: req.body },
      next
    );
    if (user) {
      req.app.emit(EVENT_TYPES.USER_EVENT_TYPES, {
        event: EVENT_MESSAGES.USER_UPDATE_USER,
        comment: `اطلاعات فردی  ${user.fullName} ویرایش شد`,
        oldItem: JSON.stringify(user),
        newItem: JSON.stringify(req.body),
        user: req.user._id
      });
      res.status(202).json({ data: user });
    }
  }
);

export const getUser = asyncHandler(
  async (
    req: Request & { user: UserDocument },
    res: Response,
    next: NextFunction
  ) => {
    const user = await getUserService(req.params.id, next);
    if (user) {
      res.status(200).json({ data: user });
    }
  }
);

export const getMe = asyncHandler(
  async (
    req: Request & { user: UserDocument },
    res: Response,
    next: NextFunction
  ) => {
    const result = await getMeService(req.user._id, next);
    if (result) {
      return res.status(200).json({
        data: result
      });
    }
    return res.status(404).json({ status: 404, data: req.user });
  }
);

export const uploadFilesUser = asyncHandler(
  async (
    req: Request & { user: UserDocument },
    res: Response,
    next: NextFunction
  ) => {
    const user = await uploadFilesUserService(
      {
        file: req.files?.file as UploadedFile,
        id: req.params.id ?? req.user._id
      },
      next
    );
    if (user) {
      req.app.emit(EVENT_TYPES.USER_EVENT_TYPES, {
        comment: `  تغییر  تصویر کاربر  ${user.fullName}`,
        event: EVENT_MESSAGES.USER_PHOTO,
        user: req.user._id,
        oldItem: JSON.stringify(user)
      });
      res.status(200).json({ data: user });
    }
  }
);

export const getUserPhoto = asyncHandler(
  async (
    req: Request<unknown, unknown, unknown, PhotoUploadRequestParams>,
    res: Response,
    next: NextFunction
  ) => {
    const readStream = fs.createReadStream(
      path.join(
        dirname(require.main?.filename ?? ""),
        "..",
        "private/sell-user/",
        req.query.photoId
      )
    );
    readStream.on("open", function () {
      readStream.pipe(res);
    });

    readStream.on("error", function (err) {
      console.log(err);
      next(err);
    });
  }
);

export const getUsers = asyncHandler(
  async (
    req: Request<
      RequestParams,
      ResponseBody,
      RequestBody,
      RequestQueryPaginationWithSearch
    >,
    res: Response,
    next: NextFunction
  ) => {
    const user = await getUsersService(
      {
        search: req.query.search,
        page: req.query.page,
        limit: req.query.limit
      },
      next
    );
    if (user) {
      res.status(200).json({ data: user });
    }
  }
);

export const updateAccess = asyncHandler(
  async (
    req: Request & { user: UserDocument },
    res: Response,
    next: NextFunction
  ) => {
    const user = await updateAccessService(
      {
        id: req.params.id,
        access: req.body.access
      },
      next
    );
    if (user) {
      await deleteUserOnRedis({ redis: global.redis, user }, next);

      req.app.emit(EVENT_TYPES.USER_EVENT_TYPES, {
        event: EVENT_MESSAGES.USER_ACCESS,
        comment: `تغییر دسترسی  برای ${user.fullName} توسط ${req.user.fullName}`,
        user: req.user._id,
        newItem: JSON.stringify(req.body)
      });
      res.status(200).json({
        data: `وضعیت دسترسی با موفقیت تغییر یافت`
      });
    }
  }
);

export const updateUserRole = asyncHandler(
  async (
    req: Request<RequestParamsId> & {
      user: UserDocument;
    },
    res: Response,
    next: NextFunction
  ) => {
    const user = await updateUserRoleService(req.params.id, next);
    if (user) {
      req.app.emit(EVENT_TYPES.USER_EVENT_TYPES, {
        event: EVENT_MESSAGES.USER_UPDATE_USER,
        comment: `اطلاعات فردی  ${user.fullName} ویرایش شد`,
        oldItem: JSON.stringify(user),
        newItem: JSON.stringify(req.body),
        user: req.user._id
      });
      res.status(202).json({ data: user });
    }
  }
);

export const getUsersNoAdmin = asyncHandler(
  async (
    req: Request<
      RequestParams,
      ResponseBody,
      RequestBody,
      RequestQueryPaginationWithSearch
    >,
    res: Response,
    next: NextFunction
  ) => {
    const user = await getUsersNoAdminService(
      {
        search: req.query.search,
        page: req.query.page,
        limit: req.query.limit
      },
      next
    );
    if (user) {
      res.status(200).json({ data: user });
    }
  }
);

export const changeUserPassword = asyncHandler(
  async (
    req: Request & { user: UserDocument },
    res: Response,
    next: NextFunction
  ) => {
    const { password } = req.body;

    const user = await changeUserPasswordService(
      { userId: req.params.userId, password },
      next
    );
    if (user) {
      await deleteUserOnRedis({ redis: global.redis, user }, next);
      req.app.emit(EVENT_TYPES.USER_EVENT_TYPES, {
        event: EVENT_MESSAGES.USER_UPDATE_USER,
        comment: `تغییر رمز عبور برای کاربر ${user.fullName} توسط ${req.user.fullName}`,
        user: req.user._id
      });
      res.status(200).json({
        data: "رمز عبور با موفقیت تغییر یافت"
      });
    }
  }
);

export const updateUserStatus = asyncHandler(
  async (
    req: Request<RequestParamsId> & {
      user: UserDocument;
    },
    res: Response,
    next: NextFunction
  ) => {
    const user = await updateUserStatusService(req.params.id, next);
    if (user) {
      req.app.emit(EVENT_TYPES.USER_EVENT_TYPES, {
        event: EVENT_MESSAGES.USER_UPDATE_USER,
        comment: `اطلاعات فردی  ${user.fullName} ویرایش شد`,
        oldItem: JSON.stringify(user),
        newItem: JSON.stringify(req.body),
        user: req.user._id
      });
      res.status(202).json({ data: user });
    }
  }
);
