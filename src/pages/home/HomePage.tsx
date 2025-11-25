import { AddTodoForm } from "../../components/add-todo-form/AddTodoForm";
import { TodoList } from "../../components/todo-list/TodoList";
import { useCallback, useContext, useEffect, useState } from "react";
import { useTodos } from "../../hooks/useTodos";
import { useDebounce } from "../../hooks/useDebounce";
import { LoadingData } from "../../components/Loading/LoadingData";
import { useNavigate, useLocation } from "react-router-dom";

export const HomePage = () => {
  const loadingContext = useContext(LoadingData);
  const {
    todos,
    loadTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleCompleted,
  } = useTodos();

  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("searchKey") || "";
  });

  const debouncedSearch = useDebounce(search, 1000);
  const [displayedTodos, setDisplayedTodos] = useState(todos);

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (debouncedSearch.trim()) {
      params.set("searchKey", debouncedSearch.trim());
    } else {
      params.delete("searchKey");
    }

    navigate({ search: params.toString() }, { replace: true });
    handleSearch();
  }, [debouncedSearch, todos]);

  const fetchTodos = useCallback(() => {
    loadingContext?.show();
    try {
      loadTodos();
    } finally {
      loadingContext?.hide();
    }
  }, [loadTodos, loadingContext]);

  const handleSearch = useCallback(() => {
    loadingContext?.show();
    try {
      const results = todos.filter((todo) =>
        debouncedSearch.trim() === ""
          ? true
          : todo.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
      setDisplayedTodos(results);
    } finally {
      loadingContext?.hide();
    }
  }, [debouncedSearch, todos, loadingContext]);

  const handleAdd = useCallback(
    (title: string) => createTodo(title),
    [createTodo]
  );
  const handleUpdate = useCallback(
    (id: string, title: string) => updateTodo(id, title),
    [updateTodo]
  );
  const handleDelete = useCallback(
    (id: string) => deleteTodo(id),
    [deleteTodo]
  );
  const handleToggle = useCallback(
    (id: string) => toggleCompleted(id),
    [toggleCompleted]
  );

  const incompleteCount = todos.filter((todo) => !todo.isCompleted).length;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-2 text-center">
        Todo App (CRUD + Hooks + Search)
      </h1>

      <p className="text-gray-600 text-center">
        Total: {incompleteCount} item(s)
      </p>

      <div className="mt-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search todos..."
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <AddTodoForm onAdd={handleAdd} />

      <TodoList
        todos={displayedTodos}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onToggle={handleToggle}
      />
    </div>
  );
};
