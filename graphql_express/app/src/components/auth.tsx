import { useMutation, gql } from "@apollo/client";
import { useState } from "react";
import useAuth from "../hooks/auth";

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      refreshToken
    }
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation] = useMutation(LOGIN);
  const { login } = useAuth();

  const handleLogin = async () => {
    const { data } = await loginMutation({ variables: { username, password } });
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
