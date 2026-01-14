import { useMutation } from "@apollo/client/react";
import { CREATE_TODO } from "@/graphql/mutations/mutations";
import { CreateTodoData, NewTodoInput } from "@/types/todo";

// Hook to add new todo using Apollo client
export const useAddTodo = () => {
  // Use the CREATE_TODO mutation
  const [mutate] = useMutation<CreateTodoData, { input: NewTodoInput }>(
    CREATE_TODO,
  );
  return {
    // Create addTodo function with text input
    addTodo: async (input: NewTodoInput) =>
      mutate({
        variables: { input },
        // Plan on updating cache
        update(cache, { data }) {
          // If nothing returned just exit
          if (!data?.createTodo) return;
          // Else modify the cache with the new todo
          cache.modify({
            fields: {
              todos(existing = []) {
                // Append the new todo to existing cache and return
                return [...existing, data.createTodo];
              },
            },
          });
        },
      }),
  };
};
