import { UploadedFile } from "express-fileupload";

export const checkFileSize = (file: UploadedFile, size: number) => {
  return file.size <= size;
};
