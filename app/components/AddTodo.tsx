"use client";

import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";

interface AddTodoProps {
  onAdd: (todo: { task: string; date?: string; priority?: string }) => void;
  onUpdate?: (todo: { task: string; date?: string; priority?: string }) => void;
  todo?: { task: string; date?: string; priority?: string };
  onCancel: () => void;
}

const AddTodo: React.FC<AddTodoProps> = ({
  onAdd,
  onUpdate,
  todo,
  onCancel,
}) => {
  const [task, setTask] = useState(todo?.task || "");
  const [date, setDate] = useState(todo?.date || "");
  const [priority, setPriority] = useState(todo?.priority || "");

  useEffect(() => {
    if (todo) {
      setTask(todo.task);
      setDate(todo.date || "");
      setPriority(todo.priority || "");
    }
  }, [todo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { task, date, priority };
    if (todo && onUpdate) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }
    setTask("");
    setDate("");
    setPriority("");
  };

  return (
    <div className="p-4 rounded-md">
      <TodoForm
        task={task}
        date={date}
        priority={priority}
        onTaskChange={setTask}
        onDateChange={setDate}
        onPriorityChange={setPriority}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddTodo;
