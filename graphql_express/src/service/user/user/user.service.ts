import { NextFunction } from "express";
import fs from "fs";
import path from "path";
import shortid from "shortid";
import { asyncServiceHandler } from "src/middleware";
import { User } from "src/models";
import {
  AddUserType,
  EditUserRoleType,
  EditUserType,
  GetUsersType,
  UpdateUserAccessType,
  UploadUserPhotoType,
  UserDocument,
  USER_ROLES,
  USER_STATUS,
  EditUserStatusType
} from "src/types";
import { FILE_SIZES } from "src/utils/constants";
import { ErrorResponse } from "src/utils/error-response";
import {
  AUTH_ERROR_TYPES,
  DATABASE_ERROR_TYPES,
  FILE_ERRORS
} from "src/utils/errors";
import {
  FILE_TYPE,
  checkFileSize,
  checkFileType
} from "src/utils/utility/files";

export const getInvoiceCreators = () =>
  User.find({ status: USER_STATUS.ACTIVE });

export const getUserByMobileOrEmail = (username: string) =>
  User.findOne({
    $or: [{ mobileNumber: username }, { email: username }],
    status: USER_STATUS.ACTIVE
  }).select("+password");

export const getUserByResetPasswordCode = (code: string) =>
  User.findOne({
    resetPasswordCode: code,
    resetPasswordCodeExpire: { $gte: new Date() }
  });

export const getUserById = (id: string) => User.findById(id);

export const getUserByFulName = (fullName: string) =>
  User.findOne({ fullName });

export const createUser = (data: AddUserType) => {
  const { fullName, mobileNumber, email, address, nationalCode, password } =
    data;

  return User.create({
    password,
    fullName,
    mobileNumber,
    email,
    address,
    nationalCode
  });
};

export const updateUserAccessById = ({ id, access }: UpdateUserAccessType) =>
  User.findByIdAndUpdate(
    id,
    {
      $set: { access }
    },
    {
      runValidators: true
    }
  );

export const updateUserById = ({ id, data }: EditUserType) => {
  const { fullName, mobileNumber, email, address, nationalCode, role } = data;

  return User.findByIdAndUpdate(
    id,
    {
      $set: { fullName, mobileNumber, email, address, nationalCode, role }
    },
    {
      runValidators: true
    }
  );
};

export const updateUserRoleById = ({ id, role }: EditUserRoleType) =>
  User.findByIdAndUpdate(
    id,
    {
      $set: { role }
    },
    {
      runValidators: true
    }
  );

export const updateUserStatusById = ({ id, status }: EditUserStatusType) =>
  User.findByIdAndUpdate(
    id,
    {
      $set: { status }
    },
    {
      runValidators: true
    }
  );

export const updateUserPhotoById = (userId: string, fileName: string) =>
  User.findByIdAndUpdate(
    userId,
    {
      $set: {
        photo: fileName
      }
    },
    {
      runValidators: true,
      new: true
    }
  );

const getUsersByAggregate = (
  page: number = 1,
  limit: number = 10,
  search?: string
) => {
  const userList = User.aggregate([
    {
      $match: {
        role: { $ne: USER_ROLES.SUPER_ADMIN },
        ...(search && {
          $or: [
            { fullName: { $regex: search } },
            { mobileNumber: { $regex: search } },
            { nationalCode: { $regex: search } }
          ]
        })
      }
    },

    {
      $project: {
        fullName: 1,
        status: 1,
        mobileNumber: 1,
        email: 1,
        photo: 1,
        nationalCode: 1,
        role: 1,
        access: 1
      }
    }
  ]);

  return User.aggregatePaginate(userList, { page, limit });
};

const getUsersNoAdminByAggregate = (
  page: number = 1,
  limit: number = 10,
  search?: string
) => {
  const userList = User.aggregate([
    {
      $match: {
        $and: [
          { role: { $ne: USER_ROLES.SUPER_ADMIN } },
          { role: { $ne: USER_ROLES.ADMIN } }
        ],
        ...(search && {
          $or: [
            { fullName: { $regex: search } },
            { mobileNumber: { $regex: search } },
            { nationalCode: { $regex: search } }
          ]
        })
      }
    },

    {
      $project: {
        fullName: 1,
        status: 1,
        mobileNumber: 1,
        email: 1,
        photo: 1,
        nationalCode: 1,
        role: 1
      }
    }
  ]);

  return User.aggregatePaginate(userList, { page, limit });
};

//------------------------------------------------------------------------------------------------------

export const createUserService = asyncServiceHandler(
  async (
    { data }: { data: AddUserType },
    next: NextFunction
  ): Promise<UserDocument | void> => {
    const createdUser = await createUser(data);
    if (createdUser) {
      return createdUser;
    } else {
      return next(
        new ErrorResponse(`${DATABASE_ERROR_TYPES.DATABASE_UNKNOWN}`)
      );
    }
  }
);

export const updateUserService = asyncServiceHandler(
  async (
    { id, data }: EditUserType,
    next: NextFunction
  ): Promise<UserDocument | void> => {
    const user = await getUserById(id);

    if (!user) {
      return next(
        new ErrorResponse(`${DATABASE_ERROR_TYPES.DATABASE_NOTFOUND}`)
      );
    }

    const updatedUser = await updateUserById({ id, data });

    if (updatedUser) {
      return updatedUser;
    } else {
      return next(
        new ErrorResponse(`${DATABASE_ERROR_TYPES.DATABASE_UNKNOWN}`)
      );
    }
  }
);

export const getUserService = asyncServiceHandler(
  async (userId: string, next: NextFunction): Promise<UserDocument | void> => {
    const user = await getUserById(userId);

    if (!user) {
      return next(
        new ErrorResponse(`${DATABASE_ERROR_TYPES.DATABASE_NOTFOUND}`)
      );
    }

    return user;
  }
);

export const getMeService = asyncServiceHandler(
  async (id: string, next: NextFunction): Promise<void | UserDocument> => {
    const user = await getUserById(id).select({
      resetPasswordCode: 0,
      resetPasswordCodeExpire: 0
    });

    if (!user) {
      return next(
        new ErrorResponse(`${DATABASE_ERROR_TYPES.DATABASE_NOTFOUND}`)
      );
    }

    return user;
  }
);

export const uploadFilesUserService = asyncServiceHandler(
  async (
    { file, id }: UploadUserPhotoType,
    next: NextFunction
  ): Promise<void | UserDocument> => {
    if (!checkFileType(file, FILE_TYPE.IMAGE)) {
      return next(new ErrorResponse(`${FILE_ERRORS.FILE_TYPE_ERROR}`));
    }

    if (!checkFileSize(file, FILE_SIZES.USER_PHOTO_SIZE)) {
      return next(new ErrorResponse(`${FILE_ERRORS.FILE_SIZE_ERROR}`));
    }

    file.name = `photo_${shortid.generate()}${
      path.parse(file.name).ext
        ? path.parse(file.name).ext
        : "." + path.parse(file.mimetype).base
    }`;

    const user = await getUserById(id);

    if (!user) {
      return next(
        new ErrorResponse(`${DATABASE_ERROR_TYPES.DATABASE_NOTFOUND}`)
      );
    }

    return new Promise((resolve, reject) => {
      file.mv(
        `${process.cwd()}/${process.env.USER_PHOTO_DIRECTORY}/${file.name}`,
        async (error: Error) => {
          if (error) {
            resolve(next(new ErrorResponse(`${FILE_ERRORS.FILE_MOVE_ERROR}`)));
          }
          await updateUserPhotoById(user!._id, file.name);

          if (user) {
            resolve(user);
          } else {
            fs.unlink(
              `${process.cwd()}/${process.env.USER_PHOTO_DIRECTORY}/${
                file.name
              }`,
              (error) => {
                console.log(error);
              }
            );
            reject(new Error("داده مورد نظر یافت نشد"));
          }
        }
      );
    });
  }
);

export const getUsersService = asyncServiceHandler(
  ({ search, limit, page }: GetUsersType) => {
    return getUsersByAggregate(page, limit, search);
  }
);

export const updateAccessService = asyncServiceHandler(
  async (
    { id, access }: UpdateUserAccessType,
    next: NextFunction
  ): Promise<UserDocument | void | null> => {
    const user = await getUserById(id);
    if (!user) {
      return next(
        new ErrorResponse(`${DATABASE_ERROR_TYPES.DATABASE_NOTFOUND}`)
      );
    }

    const updatedUser = await updateUserAccessById({ id, access });

    if (updatedUser) {
      return updatedUser;
    } else {
      return next(
        new ErrorResponse(`${DATABASE_ERROR_TYPES.DATABASE_UNKNOWN}`)
      );
    }
  }
);

export const updateUserRoleService = asyncServiceHandler(
  async (id: string, next: NextFunction): Promise<UserDocument | void> => {
    const user = await getUserById(id);

    if (user) {
      const newRole =
        user.role === USER_ROLES.ADMIN ? USER_ROLES.USER : USER_ROLES.ADMIN;
      const updatedUser = await updateUserRoleById({ id, role: newRole });

      if (updatedUser) {
        return updatedUser;
      } else {
        return next(
          new ErrorResponse(`${DATABASE_ERROR_TYPES.DATABASE_UNKNOWN}`)
        );
      }
    } else {
      return next(
        new ErrorResponse(`${DATABASE_ERROR_TYPES.DATABASE_NOTFOUND}`)
      );
    }
  }
);

export const getUsersNoAdminService = asyncServiceHandler(
  ({ search, limit, page }: GetUsersType) => {
    return getUsersNoAdminByAggregate(page, limit, search);
  }
);

export const changeUserPasswordService = asyncServiceHandler(
  async (
    { userId, password }: { userId: string; password: string },
    next: NextFunction
  ): Promise<void | UserDocument> => {
    const agent = await getUserById(userId);

    if (!agent) {
      return next(new ErrorResponse(`${AUTH_ERROR_TYPES.AUTH_NOTFOUND}`));
    }
    agent.password = password;
    await agent.save();
    return agent;
  }
);

export const updateUserStatusService = asyncServiceHandler(
  async (id: string, next: NextFunction): Promise<UserDocument | void> => {
    const user = await getUserById(id);

    if (user) {
      const newStatus =
        user.status === USER_STATUS.ACTIVE
          ? USER_STATUS.INACTIVE
          : USER_STATUS.ACTIVE;
      const updatedUser = await updateUserStatusById({ id, status: newStatus });

      if (updatedUser) {
        return updatedUser;
      } else {
        return next(
          new ErrorResponse(`${DATABASE_ERROR_TYPES.DATABASE_UNKNOWN}`)
        );
      }
    } else {
      return next(
        new ErrorResponse(`${DATABASE_ERROR_TYPES.DATABASE_NOTFOUND}`)
      );
    }
  }
);
