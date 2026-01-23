// Type for Todo
export interface Todo {
  id: string;
  text: string;
  done: boolean;
}

// Type for getting todos
export interface GetTodosData {
  todos: Todo[];
}

// Type for inputing new todo
export interface NewTodoInput {
  text: string;
}

// Type for expected todo response
export interface TodoResponse {
  id: string;
  text: string;
  done: boolean;
}

// Type for creating new todo
export interface CreateTodoData {
  createTodo: TodoResponse;
}

// Type for properties to pass to todos list
export interface TodosListProps {
  todos?: Todo[];
  addCard?: React.ReactNode;
}

// Type for properties to pass to todo form
export interface TodoFormModalProps {
  open: boolean;
  initialText?: string;
  onClose: () => void;
  onSubmit: (text: string) => Promise<void>;
}

// Type for properties to pass to add todo form
export interface AddTodoModalProps {
  open: boolean;
  onClose: () => void;
}

// Type for properties to pass to todo card
export interface TodoCardProps {
  todo: Todo;
}
