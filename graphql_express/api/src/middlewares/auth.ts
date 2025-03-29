import { verifyAccessToken } from "../utility/auth";

export const authenticateUser = (req: any) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("token", token);

  // Skip token validation for login and register routes
  if (req.path === "/login" || req.path === "/register") {
    return null;
  }

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const user = verifyAccessToken(token);
    return user;
  } catch (error) {
    throw new Error("Forbidden");
  }
};

export const authMiddleware = (req: any, res: any, next: any) => {
  try {
    const user = authenticateUser(req);
    req.user = user;
    next();
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res.status(403).json({ message: "Forbidden" });
  }
};
