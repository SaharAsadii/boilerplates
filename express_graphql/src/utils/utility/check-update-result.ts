import { UpdateWriteOpResult } from "mongoose";

export const checkUpdateResult = (updateResult: UpdateWriteOpResult) =>
  updateResult.acknowledged && updateResult.modifiedCount > 0;
