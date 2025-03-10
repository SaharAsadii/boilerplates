import express from "express";
import {
  changeUserPassword,
  createUser,
  getMe,
  getUser,
  getUserPhoto,
  getUsers,
  getUsersNoAdmin,
  updateAccess,
  updateUser,
  updateUserRole,
  updateUserStatus,
  uploadFilesUser
} from "src/controller";
import { isAdmin, isSuperAdmin, protectUser } from "src/middleware";
import {
  changeUserPasswordSchema,
  checkFileSchema,
  createUserSchema,
  protectSchema,
  updateUserSchema
} from "src/schema";

const router = express.Router();

router
  .route("/")
  .get(protectSchema, protectUser, isAdmin, getUsers)
  .post(protectSchema, protectUser, isAdmin, createUserSchema, createUser)
  .put(protectSchema, protectUser, updateUser);

router
  .route("/photo")
  .put(protectSchema, protectUser, checkFileSchema, uploadFilesUser);

router
  .route("/photo/:id")
  .get(protectSchema, protectUser, getUserPhoto)
  .put(protectSchema, protectUser, checkFileSchema, uploadFilesUser);

router.route("/me").get(protectSchema, protectUser, getMe);

router.route("/no-admin").get(protectSchema, protectUser, getUsersNoAdmin);

router
  .route("/change-password/:userId")
  .put(
    protectSchema,
    protectUser,
    isAdmin,
    changeUserPasswordSchema,
    changeUserPassword
  );
router
  .route("/status/:id")
  .patch(protectSchema, protectUser, isSuperAdmin, updateUserStatus);

router
  .route("/:id")
  .get(protectSchema, protectUser, isAdmin, getUser)
  .put(protectSchema, protectUser, isAdmin, updateUserSchema, updateUser)
  .patch(protectSchema, protectUser, isSuperAdmin, updateUserRole);

// ---------------------------------------- change user access
router
  .route("/access/:id")
  .put(protectSchema, protectUser, isAdmin, updateAccess);

export default router;
