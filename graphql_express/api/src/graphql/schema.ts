import { gql } from "graphql-tag";

const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type AuthPayload {
    token: String!
    refreshToken: String!
  }

  type User {
    id: ID!
    fullName: String!
    username: String!
    password: String!
  }

  type Query {
    getTasks: [Task!]!
    me: User
  }

  type Mutation {
    addTask(title: String!): Task!
    completeTask(id: ID!): Task!
    deleteTask(id: ID!): Task!
    register(
      fullName: String!
      username: String!
      password: String!
    ): AuthPayload!
    login(username: String!, password: String!): AuthPayload!
    refreshToken(token: String!): String!
  }
`;

export default typeDefs;
