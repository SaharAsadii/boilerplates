import mongoose from "mongoose";

export type ProvinceType = {
  name: string;
  _id: string;
  slug: string;
};

export type CityType = {
  name: string;
  provinceId: mongoose.Types.ObjectId;
  _id: string;
  slug: string;
};
