import { errors } from "./errors";
import { ErrorValueSchema } from "./errors/index";

export const errorGenerator = (message: string) => {
  return errors.get(message) as ErrorValueSchema;
};
