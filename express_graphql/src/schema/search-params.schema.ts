import { differenceInMonths } from "date-fns";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "src/utils/error-response";

const checkSearchParamsSchema = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return next(
      new ErrorResponse("انتخاب بازه زمانی الزامی می باشد", 401, "schema-error")
    );
  }

  const start = startDate as string;
  const end = endDate as string;

  if (differenceInMonths(end, start) >= 6) {
    return next(
      new ErrorResponse(
        "بازه زمانی انتخاب شده نباید بیشتر از ۶ ماه باشد",
        401,
        "schema-error"
      )
    );
  }

  next();
};

export { checkSearchParamsSchema };
