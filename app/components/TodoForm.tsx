"use client";

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
  date,
  priority,
  onTaskChange,
  onDateChange,
  onPriorityChange,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="items-center justify-center border border-[#f2f2f2] shadow-md rounded-lg p-2 bg-white"
    >
      <div className="flex flex-col mb-4">
        <input
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className="text-base text-12 p-3 border border-[#f2f2f2] rounded-md font-normal"
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
          value={priority || ""}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="text-base text-12 p-3 mt-1 border border-[#f2f2f2] rounded-md font-normal"
        >
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full text-base text-14 p-3 bg-add text-white rounded-md"
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
