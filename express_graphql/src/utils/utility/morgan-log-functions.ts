import { Request, Response } from "express";
import { UserDocument } from "src/types";

export function morganLog(
  req: Request & {
    logUser: UserDocument | null;
  },
  res: Response
) {
  let output = "";
  //logging remote user address
  if (Array.isArray(req.headers["x-forwarded-for"])) {
    output = output
      .concat(req.headers["x-forwarded-for"].join(" "))
      .concat(" - ");
  } else {
    output =
      (req.headers["x-forwarded-for"] &&
        output.concat(req.headers["x-forwarded-for"]).concat(" - ")) ||
      " ";
  }

  output = output
    .concat(new Date().toLocaleDateString("fa-IR"))
    .concat(" - ")
    .concat(new Date().toLocaleTimeString("fa-IR"))
    .concat(" - ");
  output = output.concat(req.logUser ? " user " : "").concat(" - ");
  output = output.concat(req.method).concat(" - ");
  output = output.concat(req.baseUrl).concat(req.url).concat(" - ");
  output = output.concat(res.statusCode + "").concat(" - ");
  output = output.concat(req.logUser?.fullName || "").concat(" - ");
  output = output.concat(req.logUser?.mobileNumber || "").concat(" - ");
  output = output.concat(req.logUser?.email || "").concat(" - ");
  if (req.headers["user-agent"])
    output = output.concat(req.headers["user-agent"]).concat(" - ");

  return req.socket.remoteAddress + " - " + output;
}
