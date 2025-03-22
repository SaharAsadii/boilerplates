import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { USER_ROLES, UserDocument } from "src/types";
import { ErrorResponse } from "src/utils/error-response";
import { AUTH_ERROR_TYPES } from "src/utils/errors";
import { asyncHandler } from "./async-handler.middleware";
import { USER_ACCESS, config } from "src/utils/constants";
import { getClueById, getTaskById } from "src/service";

export const protectUser = asyncHandler(
  async (
    req: Request & { user?: UserDocument | null },
    res: Response,
    next: NextFunction
  ) => {
    let token;
    const redisClient = global.redis;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new ErrorResponse(`${AUTH_ERROR_TYPES.AUTH_NOT_LOGIN}`));
    }

    const key = process.env.JWT_SECRET;

    try {
      const decode: string | JwtPayload = jwt.verify(token, key);

      if (typeof decode !== "string" && decode?.id) {
        const user = await redisClient.get(`user-sell:${decode.id}`);
        if (!user) {
          return next(new ErrorResponse(`${AUTH_ERROR_TYPES.AUTH_NOT_LOGIN}`));
        }
        req.user = JSON.parse(user);
        return next();
      }
    } catch (error) {
      return next(new ErrorResponse(`${AUTH_ERROR_TYPES.AUTH_NOT_LOGIN}`));
    }
  }
);

// for each request , thi middleware is run before request is proccessed
export const checkUserExistsForLogging = asyncHandler(
  async (
    req: Request & { logUser?: UserDocument | null },
    _res: Response,
    next: NextFunction
  ) => {
    let token = undefined;
    const redisClient = global.redis;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
      const key = process.env.JWT_SECRET;

      try {
        const decode: string | JwtPayload = jwt.verify(token, key);

        if (typeof decode !== "string" && decode?.id) {
          const user = await redisClient.get(`user:${decode.id}`);
          if (user) {
            req.logUser = JSON.parse(user);
          }
        }
        return next();
      } catch (error) {
        return next();
      }
    }
    return next();
  }
);

export const isAdmin = (
  req: Request & { user?: UserDocument },
  _res: Response,
  next: NextFunction
) => {
  if (req.user?.role === USER_ROLES.USER) {
    return next(new ErrorResponse(`${AUTH_ERROR_TYPES.AUTH_NOTAUTHORIZED}`));
  }
  next();
};

export const isSuperAdmin = (
  req: Request & { user?: UserDocument },
  _res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== USER_ROLES.SUPER_ADMIN) {
    return next(new ErrorResponse(`${AUTH_ERROR_TYPES.AUTH_NOTAUTHORIZED}`));
  }
  next();
};

export const authorize =
  (access: USER_ACCESS[]) =>
  (
    req: Request & { user?: UserDocument },
    _res: Response,
    next: NextFunction
  ) => {
    const grant =
      access.some((accessItem) => req.user?.access.includes(accessItem)) ||
      req.user?.role === USER_ROLES.ADMIN ||
      req.user?.role === USER_ROLES.SUPER_ADMIN;

    if (grant) return next();
    return next(new ErrorResponse(`${AUTH_ERROR_TYPES.AUTH_NOTAUTHORIZED}`));
  };

export const authenticateInternalServerRequest = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const hash = req.headers["x-asiatech-hash"];
  if (hash && hash === config.INTERNAL_SERVER.INTERNAL_SERVER_HASH)
    return next();
  return next(new ErrorResponse(`${AUTH_ERROR_TYPES.AUTH_NOTAUTHORIZED}`));
};

export const hasAccessToTask = async (
  req: Request & { user?: UserDocument },
  _res: Response,
  next: NextFunction
) => {
  const task = await getTaskById(req.params.id);

  if (!task)
    return next(new ErrorResponse(`${AUTH_ERROR_TYPES.AUTH_NOTAUTHORIZED}`));
  else {
    if (
      req.user?.role === USER_ROLES.USER &&
      !req.user?.access.includes(USER_ACCESS.TASKS) &&
      task.userId.toString() !== req.user._id.toString() &&
      task.assignedTo.toString() !== req.user._id.toString()
    )
      return next(new ErrorResponse(`${AUTH_ERROR_TYPES.AUTH_NOTAUTHORIZED}`));
  }
  next();
};

export const hasAccessToClue = async (
  req: Request & { user?: UserDocument },
  _res: Response,
  next: NextFunction
) => {
  const task = await getClueById(req.params.id);

  if (!task)
    return next(new ErrorResponse(`${AUTH_ERROR_TYPES.AUTH_NOTAUTHORIZED}`));
  else {
    if (
      req.user?.role === USER_ROLES.USER &&
      !req.user?.access.includes(USER_ACCESS.CLUE)
    )
      return next(new ErrorResponse(`${AUTH_ERROR_TYPES.AUTH_NOTAUTHORIZED}`));
  }
  next();
};

export const hasAccessToCustomers = async (
  req: Request & { user?: UserDocument },
  _res: Response,
  next: NextFunction
) => {
  if (
    req.user?.role === USER_ROLES.USER &&
    !req.user?.access.includes(USER_ACCESS.ALL_CUSTOMERS) &&
    (typeof req.query.search?.length === "number"
      ? req.query.search?.length < 5
      : false)
  )
    return next(
      new ErrorResponse(`برای مشاهده لیست مشتریان حداقل 5 کاراکتر وارد نمایید`)
    );

  next();
};
