import { useState, useContext } from "react";
import type { ITodo } from "../../utils/interface/todo";
import { LoadingData } from "../Loading/LoadingData";

interface TodoItemProps {
  todo: ITodo;
  onUpdate: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export const TodoItem = ({
  todo,
  onUpdate,
  onDelete,
  onToggle,
}: TodoItemProps) => {
  const loadingContext = useContext(LoadingData);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSave = async () => {
    const trimmed = editTitle.trim();
    if (!trimmed) return;

    loadingContext?.show();

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await onUpdate(todo.id, trimmed);
      setIsEditing(false);
    } finally {
      loadingContext?.hide();
    }
  };

  const handleDelete = async () => {
    loadingContext?.show();

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await onDelete(todo.id);
    } finally {
      loadingContext?.hide();
    }
  };

  return (
    <div className="flex justify-between items-center p-2 border rounded mb-2">
      <div className="flex items-center gap-2 flex-1">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onToggle(todo.id)}
        />
        {isEditing ? (
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1 border rounded px-2 py-1"
          />
        ) : (
          <span
            className={todo.isCompleted ? "line-through text-gray-400" : ""}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="text-green-600 cursor-pointer"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-yellow-600 cursor-pointer"
          >
            Edit
          </button>
        )}
        <button onClick={handleDelete} className="text-red-500 cursor-pointer">
          Delete
        </button>
      </div>
    </div>
  );
};
