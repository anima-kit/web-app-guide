import { gql } from "@apollo/client";

// Define GraphQL mutation to create todo
export const CREATE_TODO = gql`
  mutation CreateTodo($input: NewTodo!) {
    createTodo(input: $input) {
      id
      text
      done
    }
  }
`;
