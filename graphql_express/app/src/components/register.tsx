import { useMutation, gql } from "@apollo/client";
import { useState } from "react";
import useAuth from "../hooks/auth";

const LOGIN = gql`
  mutation Register(
    $fullName: String!
    $username: String!
    $password: String!
  ) {
    register(fullName: $fullName, username: $username, password: $password) {
      token
      refreshToken
    }
  }
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setName] = useState("");
  const [loginMutation] = useMutation(LOGIN);
  const { login } = useAuth();

  const handleLogin = async () => {
    const { data } = await loginMutation({
      variables: { username, password, fullName },
    });
    login(data.login.token, data.login.refreshToken);
  };

  return (
    <div>
      <input
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <input
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        type="text"
      />
      <button onClick={handleLogin}>Register</button>
    </div>
  );
};

export default Register;
