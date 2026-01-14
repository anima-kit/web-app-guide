import { useQuery } from "@apollo/client/react";
import { GET_TODOS } from "@/graphql/queries/queries";
import { GetTodosData } from "@/types/todo";

// Hook to get list of all todos using Apollo client
export const useTodos = () => useQuery<GetTodosData>(GET_TODOS);
