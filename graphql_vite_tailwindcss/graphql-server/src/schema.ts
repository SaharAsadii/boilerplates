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
    name: String!
    email: String!
    token: String
  }

  type Mutation {
    addTask(title: String!): Task!
    completeTask(id: ID!): Task!
    deleteTask(id: ID!): Task!
    register(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
  }
`;

export default typeDefs;
