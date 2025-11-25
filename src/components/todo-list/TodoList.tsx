import { useMemo } from "react";
import { TodoItem } from "../todo-item/TodoItem";
import type { ITodo } from "../../utils/interface/todo";

interface TodoListProps {
  todos: ITodo[];
  onUpdate: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export const TodoList = ({
  todos,
  onUpdate,
  onDelete,
  onToggle,
}: TodoListProps) => {
  const todoItems = useMemo(() => {
    return todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onUpdate={onUpdate}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    ));
  }, [todos, onUpdate, onDelete, onToggle]);

  if (todos.length === 0)
    return <p className="text-gray-500 mt-4">No todos yet.</p>;

  return <div className="mt-4">{todoItems}</div>;
};
