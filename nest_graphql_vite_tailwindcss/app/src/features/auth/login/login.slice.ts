import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      accessToken
      user {
        _id
        email
        name
      }
    }
  }
`;
