import { UploadedFile } from "express-fileupload";

export enum FILE_TYPE {
  IMAGE = "image",
  PDF = "pdf",
  XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  XLS = "application/vnd.ms-excel"
}

export const checkFileType = (
  file: UploadedFile,
  type: FILE_TYPE = FILE_TYPE.IMAGE
) => {
  return file.mimetype.includes(type);
};
