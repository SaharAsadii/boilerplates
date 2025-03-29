import jwt from "jsonwebtoken";

export const generateAccessToken = (user: any) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "1800s",
  });
};

export const generateRefreshToken = (user: any) => {
  return jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
};
