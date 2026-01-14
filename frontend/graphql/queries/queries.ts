import { gql } from "@apollo/client";

// Define GraphQL query for getting todos
export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      done
    }
  }
`;
