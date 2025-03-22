/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-var */
import { createClient } from "redis";

declare global {
  namespace globalThis {
    var redis: ReturnType<typeof createClient>;
  }
}

declare module "xss-clean" {
  type SanitizeFunction = Function;
  var value: SanitizeFunction;

  export default value;
}
