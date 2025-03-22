import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import _ from "lodash";
import mongoose, { AggregatePaginateModel } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import { USER_ROLES, UserDocument } from "src/types";
import { USER_ACCESS, config } from "src/utils/constants";
import { validateMelliCode } from "src/utils/utility";

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    email: {
      type: String,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "ایمیل نا معتبر"]
    },
    role: {
      type: String,
      enum: {
        values: Object.values(USER_ROLES),
        message: "نقش انتخاب شده صحیح نمی باشد"
      },
      default: USER_ROLES.USER
    },
    access: [{ type: String, enum: USER_ACCESS }],

    mobileNumber: {
      type: String,
      match: [/^(\+98|0)?9\d{9}$/, "شماره موبایل صحیح نمی باشد"],
      required: [true, "شماره موبایل الزامی می باشد"],
      unique: [true, "این شماره موبایل قبلا ثبت شده است"]
    },

    status: {
      type: String,
      enum: {
        values: ["active", "inactive"],
        message: "نقش انتخاب شده صحیح نمی باشد"
      },
      default: "active"
    },

    photo: {
      type: String
    },
    password: {
      type: String,
      required: [true, "پسورد الزامی می باشد"],
      minlength: [8, "حداقل تعداد کاراکتر ۸ می باشد"],
      select: false
    },
    resetPasswordCode: String,
    resetPasswordCodeExpire: Date,
    fullName: {
      unique: true,
      type: String,
      required: [true, "نام کامل الزامی می باشد"],
      trim: true
    },
    nationalCode: {
      type: String,
      trim: true,
      validate: {
        validator: validateMelliCode,
        message: () => `کد ملی وارد شده معتبر نمی باشد`
      }
    },

    address: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt
    .genSalt(10)
    .then((salt) => {
      return bcrypt.hash(this.password, salt);
    })
    .then((password) => {
      this.password = password;
      return next();
    });
});

// Creating a web token
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, config.JWT.JWT_SECRET, {
    expiresIn: config.JWT.JWT_EXPIRE
  });
};

// Checking password
UserSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Creating code
UserSchema.methods.generateRandomNumericCode = function () {
  const code = _.random(100000, 999999);

  return code;
};

UserSchema.plugin(aggregatePaginate);

export const User =
  (mongoose.models.User as AggregatePaginateModel<UserDocument>) ||
  mongoose.model<UserDocument>("User", UserSchema);
