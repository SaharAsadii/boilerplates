import mongoose from "mongoose";
import { USER_ACCESS } from "src/utils/constants";
import { UploadedFile } from "express-fileupload";

export interface UserType {
  email: string;
  role: USER_ROLES;
  password: string;
  status?: USER_STATUS;
  access: USER_ACCESS[];
  resetPasswordCode?: string;
  resetPasswordCodeExpire?: Date;
  fullName: string;
  address?: string;
  nationalCode?: string;
  mobileNumber?: string; //when adding string throws error because it has unique
  photo?: string;
  getSignedJwtToken: () => Promise<string>;
  matchPassword: (password: string) => Promise<boolean>;
  generateRandomNumericCode: () => string;
}

export type UserDocument = mongoose.Document & UserType;

export type AddUserType = Omit<
  UserType,
  | "getSignedJwtToken"
  | "matchPassword"
  | "generateRandomNumericCode"
  | "resetPasswordCode"
  | "resetPasswordCodeExpire"
  | "photo"
>;

export enum USER_ROLES {
  USER = "user",
  ADMIN = "admin",
  SUPER_ADMIN = "superadmin"
}
export enum USER_STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

export interface SmsPanelType {
  API_KEY: string;
  panelNumber: number;
}

export interface EditUserType {
  data: AddUserType;
  id: string;
}

export interface EditUserRoleType {
  id: string;
  role: USER_ROLES;
}

export interface EditUserStatusType {
  id: string;
  status: USER_STATUS;
}

export interface GetUserType {
  paramId: string;
  userId: string;
}

export interface UpdateUserSmsPanel {
  id: UserDocument;
  data: SmsPanelType;
}

export interface GetUsersType {
  search?: string;
  page: number;
  limit: number;
}

export interface UploadUserPhotoType {
  file: UploadedFile;
  id: string;
}

export interface UpdateUserAccessType {
  access: Pick<AddUserType, "access">;
  id: string;
}
