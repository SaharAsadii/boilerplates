/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

export const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
export const asyncServiceHandler =
  <T, U>(fn: (data: T, next: NextFunction) => U) =>
  (data: T, next: NextFunction) => {
    try {
      return fn(data, next);
    } catch (error) {
      next(error);
    }
  };
