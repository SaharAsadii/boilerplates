import { gql } from "graphql-tag";

const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    getTasks: [Task!]!
    me: User
  }

  type User {
    id: ID!
    username: String!
    email: String!
    fullName: String!
    password: String!
  }

  type Mutation {
    addTask(title: String!): Task!
    completeTask(id: ID!): Task!
    deleteTask(id: ID!): Task!
    login(username: String!, password: String!): String!
    register(username: String!, password: String!): String!
    logout: Boolean!
  }
`;

export default typeDefs;
