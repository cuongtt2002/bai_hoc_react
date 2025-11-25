import { useState, useRef, useEffect, useContext } from "react";
import { LoadingData } from "../Loading/LoadingData";

interface AddTodoFormProps {
  onAdd: (title: string) => void;
}

export const AddTodoForm = ({ onAdd }: AddTodoFormProps) => {
  const [title, setTitle] = useState("");
  const loadingContext = useContext(LoadingData);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    loadingContext?.show();

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await onAdd(trimmed);
    } finally {
      loadingContext?.hide();
    }

    setTitle("");
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter new todo"
        className="flex-1 border rounded px-3 py-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add
      </button>
    </form>
  );
};
