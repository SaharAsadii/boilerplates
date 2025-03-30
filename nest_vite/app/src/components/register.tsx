import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/register", {
        name,
        email,
        password,
      });
      navigate("/login"); // Redirect to login after registration
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Registration failed", err.response?.data);
      } else {
        console.error("An unexpected error occurred", err);
      }
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-2">
      <input
        className="border p-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
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
        Register
      </button>
    </form>
  );
};

export default Register;
