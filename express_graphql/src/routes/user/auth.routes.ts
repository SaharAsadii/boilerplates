import express from "express";
import {
  changePassword,
  forgetPassword,
  loginUser,
  regenerateForgetPasswordCode,
  resetPassword
} from "src/controller";
import { protectUser } from "src/middleware";
import {
  changePasswordUserSchema,
  forgetPasswordSchema,
  loginUserSchema,
  protectSchema,
  resetPasswordSchema
} from "src/schema";

const router = express.Router();

// ---------------------------------------- login user
router.route("/login").post(loginUserSchema, loginUser);

// ---------------------------------------- forget password request
router.route("/forgetPassword").get(forgetPasswordSchema, forgetPassword);

// ---------------------------------------- reset password
router.route("/resetPassword").get(resetPasswordSchema, resetPassword);

// ---------------------------------------- resend reset password code
router.route("/forgetPassword/:id").get(regenerateForgetPasswordCode);

// ---------------------------------------- change user passwords
router
  .route("/changePassword")
  .put(protectSchema, protectUser, changePasswordUserSchema, changePassword);

export default router;
