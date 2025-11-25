import { TODO_KEY } from "../utils/constants/common";
import type { ITodo } from "../utils/interface/todo";

export const todoService = {
  load(): ITodo[] {
    try {
      const raw = localStorage.getItem(TODO_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  save(todos: ITodo[]) {
    try {
      localStorage.setItem(TODO_KEY, JSON.stringify(todos));
    } catch {}
  },
};
