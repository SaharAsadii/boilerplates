import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { JwtPayload } from "jwt-decode";

const useAuth = () => {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp && decoded.exp * 1000 > Date.now()) {
        setUser(decoded);
      } else {
        refreshToken();
      }
    }
  }, []);

  const login = (token: string, refreshToken: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    setUser(jwtDecode(token));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        const { data } = await axios.post("http://localhost:4000/graphql", {
          query: `mutation { refreshToken(token: "${refreshToken}") { token } }`,
        });
        login(data.data.refreshToken.token, refreshToken);
      } catch {
        logout();
      }
    }
  };

  return { user, login, logout };
};

export default useAuth;
