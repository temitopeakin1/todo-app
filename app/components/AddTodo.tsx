"use client";

import { useState } from "react";

interface AddTodoProps {
  onAdd: (todo: { text: string }) => void;
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!text) {
      alert("Please add a task");
      return;
    }

    onAdd({ text });

    setText("");
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center space-x-4 mb-4">
      <input
        type="text"
        placeholder="Add a new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-grow p-2 border rounded-md"
      />
      <button
        type="submit"
        className="bg-primary text-white p-2 rounded-md"
      >
        Add Task
      </button>
    </form>
  );
}
