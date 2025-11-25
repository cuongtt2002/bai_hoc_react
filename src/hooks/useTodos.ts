import { useState, useCallback } from "react";
import type { ITodo } from "../utils/interface/todo";
import { todoService } from "../services/todo.service";

export const useTodos = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const loadTodos = useCallback(async () => {
    const data = todoService.load();
    setTodos(data);
  }, []);

  const saveTodos = useCallback((newTodos: ITodo[]) => {
    setTodos(newTodos);
    todoService.save(newTodos);
  }, []);

  const createTodo = useCallback(
    (title: string) => {
      const newTodo: ITodo = {
        id: crypto.randomUUID(),
        title,
        isCompleted: false,
      };
      saveTodos([newTodo, ...todos]);
    },
    [todos, saveTodos]
  );

  const updateTodo = useCallback(
    (id: string, newTitle: string) => {
      const updated = todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      );
      saveTodos(updated);
    },
    [todos, saveTodos]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      const updated = todos.filter((todo) => todo.id !== id);
      saveTodos(updated);
    },
    [todos, saveTodos]
  );

  const toggleCompleted = useCallback(
    (id: string) => {
      const updated = todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
      saveTodos(updated);
    },
    [todos, saveTodos]
  );

  return {
    todos,
    loadTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleCompleted,
  };
};
