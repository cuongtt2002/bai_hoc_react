import { useState, useCallback } from "react";
import type { ITodo } from "../utils/interface/todo";
import { todoService } from "../services/todo.service";

export const useTodos = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const loadTodos = useCallback(async () => {
    const data = todoService.load();
    setTodos(data);
  }, []);

  const createTodo = useCallback((title: string) => {
    const newTodo: ITodo = {
      id: crypto.randomUUID(),
      title,
      isCompleted: false,
    };

    setTodos((prev) => {
      const updated = [newTodo, ...prev];
      todoService.save(updated);
      return updated;
    });
  }, []);

  const updateTodo = useCallback((id: string, newTitle: string) => {
    setTodos((prev) => {
      const updated = prev.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      );
      todoService.save(updated);
      return updated;
    });
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => {
      const updated = prev.filter((todo) => todo.id !== id);
      todoService.save(updated);
      return updated;
    });
  }, []);

  const toggleCompleted = useCallback((id: string) => {
    setTodos((prev) => {
      const updated = prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
      todoService.save(updated);
      return updated;
    });
  }, []);

  return {
    todos,
    loadTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleCompleted,
  };
};
