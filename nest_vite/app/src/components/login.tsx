import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is not provided");
  }
  const { login } = authContext;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      login(data.token);
      navigate("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Login failed", err.response?.data);
      } else {
        console.error("An unexpected error occurred", err);
      }
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-2">
      <input
        className="border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        className="border p-2"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button className="bg-blue-500 text-white p-2" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
