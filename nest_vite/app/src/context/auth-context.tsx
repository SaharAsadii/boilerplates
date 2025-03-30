import { createContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
  user: unknown;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchUser(token);
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const { data } = await axios.get("http://localhost:3000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
    } catch {
      setUser(null);
    }
  };

  const login = (token: string) => {
    localStorage.setItem("token", token);
    fetchUser(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
