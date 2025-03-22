import { gql } from "graphql-tag";

const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    getTasks: [Task!]!
  }

  type Mutation {
    addTask(title: String!): Task!
    completeTask(id: ID!): Task!
    deleteTask(id: ID!): Task!
  }
`;

export default typeDefs;
