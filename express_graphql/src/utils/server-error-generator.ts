import { ErrorResponse } from "./error-response";

interface MongooseError {
  name: string;
  code: number;
  errors: { error: { errors: { message: string }[] }[] };
  message: string;
}

export const serverErrorGenerator = (
  err: Error | MongooseError
): ErrorResponse => {
  let error = undefined;
  // Mongoose id not found
  if (err.name === "CastError") {
    const message = `منابع مورد نظر موجود نمی باشد`;
    error = new ErrorResponse(message, 404, "CastError");
    return error;
  }

  // Mongoose duplicate field

  if ("code" in err && err.code === 11000) {
    const message = `این مورد قبلا ثبت شده است`;
    error = new ErrorResponse(message, 400, "DuplicateError");
    return error;
  }

  //Mongoose validation error

  if ("name" in err && "errors" in err && err.name === "ValidationError") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const message = Object.values(err.errors).map((item: any) => {
      return item.errors ? getErrorMessage(item.errors) : item.message;
    });
    error = new ErrorResponse(message.join(","), 400, "ValidationError");
    return error;
  }

  return new ErrorResponse(err.message, undefined, undefined);
};

const getErrorMessage = (errors: Error[]): string =>
  Object.values(errors)
    .map((item) => {
      return item.message;
    })
    .join("/");
