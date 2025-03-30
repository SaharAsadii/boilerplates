import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const REGISTER_MUTATION = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerUser, { loading, error }] = useMutation(REGISTER_MUTATION, {
    onCompleted: () => navigate("/login"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser({ variables: { name, email, password } });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h2 className="text-xl mb-4">Register</h2>
        {error && <p className="text-red-500">{error.message}</p>}
        <input
          className="border p-2 w-full mb-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
