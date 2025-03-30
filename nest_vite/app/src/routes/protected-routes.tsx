import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
