"use client";

import { useState, useEffect } from "react";

interface TodoFormProps {
  task: string;
  date?: string;
  priority?: string;
  onTaskChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  task,
  date = "", 
  priority = "", 
  onTaskChange,
  onDateChange,
  onPriorityChange,
  onSubmit,
}) => {
  const [isTaskValid, setIsTaskValid] = useState(false);
  const [isDateValid, setIsDateValid] = useState(false);
  const [isPriorityValid, setIsPriorityValid] = useState(false);

  useEffect(() => {
    setIsTaskValid(task.trim().length > 0);
    setIsDateValid(date.trim().length > 0);
    setIsPriorityValid(priority.trim().length > 0);
  }, [task, date, priority]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isTaskValid) {
      window.alert("Task is empty!");
      return;
    }
    if (!isDateValid) {
      window.alert("Date is not selected!");
      return;
    }
    if (!isPriorityValid) {
      window.alert("Priority is not selected!");
      return;
    }

    onSubmit(e);
  };

  return (
    <div className="items-center justify-center">
    <form
      onSubmit={handleSubmit}
      className="items-center justify-center border border-[#f2f2f2] shadow-md rounded-lg p-2 bg-white"
    >
      <div className="flex flex-col mb-4">
        <input
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full text-base text-12 p-3 border border-[#f2f2f2] rounded-md font-normal"
        />
      </div>
      <div className="flex flex-col mb-4">
        <input
          type="text"
          placeholder="Enter Todo"
          value={task}
          onChange={(e) => onTaskChange(e.target.value)}
          className="text-base text-12 p-3 border border-[#f2f2f2] rounded-md font-normal"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <select
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="text-base text-12 p-3 mt-1 border border-[#f2f2f2] rounded-md font-normal"
        >
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={!isTaskValid || !isDateValid || !isPriorityValid}
        className={`w-full text-base text-14 p-3 rounded-md ${
          !isTaskValid || !isDateValid || !isPriorityValid
            ? "bg-grey text-gray-500 cursor-not-allowed"
            : "bg-add text-white"
        }`}
      >
        Add Todo
      </button>
    </form>
    </div>
  );
};

export default TodoForm;
