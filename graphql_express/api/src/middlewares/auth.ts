import jwt from "jsonwebtoken";
import { verifyAccessToken } from "../utility/auth";
import user from "../models/user";

export const authMiddleware = async (req: any, res: any) => {
  try {
    const user = await authenticateUser(req);
    console.log({ user });

    return {
      user: user ? { id: (user as unknown as { _id: string })._id } : null,
    };
  } catch (error) {
    return { user: null };
  }
};

export const authenticateUser = async (req: any) => {
  let euser = null;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      console.log({ decoded });
      euser = await user
        .findById((decoded as { userId: string }).userId)
        .select("-password");

      return euser;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  return { user };
};
