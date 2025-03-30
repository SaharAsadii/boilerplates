import { useState, useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const { login } = useContext(AuthContext)!;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      login(data.login.token);
      navigate("/dashboard");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({ variables: { email, password } });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h2 className="text-xl mb-4">Login</h2>
        {error && <p className="text-red-500">{error.message}</p>}
        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 w-full"
          disabled={loading}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
