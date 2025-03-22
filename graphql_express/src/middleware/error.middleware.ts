import { NextFunction, Request, Response } from "express";
import { errorGenerator } from "src/utils/error-generator";
import { ErrorResponse } from "src/utils/error-response";
import { ErrorValueSchema } from "src/utils/errors";
import { serverErrorGenerator } from "src/utils/server-error-generator";
import * as Sentry from "@sentry/node";
import { UserDocument } from "src/types";

class ErrorHandler {
  constructor(
    public error: ErrorResponse,
    public req: Request,
    public res: Response,
    public next: NextFunction
  ) {}

  findError(): void {
    const error: ErrorValueSchema = this.errorGenerator();
    if (error) {
      Sentry.captureException(error, {
        user: (this.req as Request & { user?: UserDocument })?.user
      });
      this.res.status(error.statusCode || 500).json({
        status: error.statusCode || 500,
        type: error.type || "CustomError",
        error: error.message || "مشکل در سرور"
      });
    } else {
      const error = this.serverErrorGenerator();
      Sentry.captureException(error, {
        user: (this.req as Request & { user?: UserDocument })?.user
      });
      this.res.status(error.statusCode || this.error.statusCode || 500).json({
        status: error.statusCode || this.error.statusCode || 500,
        type: error.type || this.error.type || "ServerError",
        error: error.message || this.error.message || "مشکل در سرور"
      });
    }
  }

  private errorGenerator(): ErrorValueSchema {
    return errorGenerator(this.error.message);
  }

  private serverErrorGenerator(): ErrorResponse {
    return serverErrorGenerator(this.error);
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.warn(err);
  console.warn(err.stack as string);
  console.warn(err.name);

  const errorInstance = new ErrorHandler(err, req, res, next);

  errorInstance.findError();
};
