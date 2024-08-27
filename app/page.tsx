"use client";

import { useState, useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";
import AddTodo from "./components/AddTodo";
import { GoTrash, GoPencil } from "react-icons/go";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/utils/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

interface Todo {
  id: number;
  date?: string;
  task: string;
  priority?: string;
}

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userSession = sessionStorage.getItem("user");
      if (!user || !userSession) {
        router.push("/signup");
      }

      const savedTodos = localStorage.getItem("todos");
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }

      setLoading(false); 
    }
  }, [user, router]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, loading]);

  // logic to add task
  const addTask = (todo: { task: string; date?: string; priority?: string }) => {
    const id = Math.floor(Math.random() * 1000) + 1;
    const newTodo: Todo = {
      id,
      ...todo,
      date: todo.date ? formatDate(new Date(todo.date)) : formatDate(new Date()),
    };
    setTodos([...todos, newTodo]);
  };

  // logic to update a task
  const updateTask = (updatedTodo: { task: string; date?: string; priority?: string }) => {
    if (editTodo) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editTodo.id
          ? {
              ...todo,
              ...updatedTodo,
              date: updatedTodo.date ? formatDate(new Date(updatedTodo.date)) : todo.date,
            }
          : todo
      );
      setTodos(updatedTodos);
      setEditTodo(null);
    }
    setShowAddTodo(false);
  };

  // logic to delete a todo task
  const deleteItem = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditClick = (todo: Todo) => {
    setEditTodo(todo);
    setShowAddTodo(true);
  };

  const handleToggleAddIcon = () => {
    setShowAddTodo((prev) => !prev);
    if (showAddTodo) {
      setEditTodo(null);
    }
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getDaySuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const suffix = getDaySuffix(day);
    const formattedDate = `${date.toLocaleDateString("en-US", { weekday: "long" })}, ${day}${suffix} ${date.toLocaleDateString("en-US", { month: "short" })}`;
    return formattedDate;
  };

  // Group tasks by date
  const groupTasksByDate = (tasks: Todo[]) => {
    return tasks.reduce((groups: { [key: string]: Todo[] }, task) => {
      const date = task.date || "No Date";
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(task);
      return groups;
    }, {});
  };

  const groupedTodos = groupTasksByDate(todos);

  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-16 bg-grey">
      <button
        className="text-14 -mt-8 mb-4"
        onClick={() => {
          signOut(auth);
          sessionStorage.removeItem("user");
        }}
      >
        Logout
      </button>
      <div className="flex flex-col font-bold bg-background w-[350px] md:w-[421px] h-auto p-4 md:p-8 rounded-xl text-[28.7px]">
        <div className="text-left my-6">To Do List</div>

        {showAddTodo && (
          <AddTodo
            onAdd={addTask}
            onUpdate={updateTask}
            todo={editTodo || undefined}
            onCancel={() => setShowAddTodo(false)}
          />
        )}

        {/* Render tasks grouped by date */}
        <div className="flex-grow">
          {Object.keys(groupedTodos).length > 0 ? (
            Object.entries(groupedTodos).map(([date, tasks]) => (
              <div key={date} className="-mb-8 -mt-8 pt-8">
                <div className="text-[16.37px] pb-2.5 text-add font-serif">
                  {date}
                </div>
                {tasks.map((todo) => (
                  <div key={todo.id} className="relative mb-6 w-full">
                    {/* Task container with border */}
                    <div className="border border-[#f2f2f2] shadow-md rounded-lg p-4">
                      {/* Task and icons */}
                      <div className="flex justify-between items-center mb-3">
                        <span
                          className="text-[18.71px] cursor-pointer font-normal"
                          onClick={() => handleEditClick(todo)}
                        >
                          {todo.task}
                        </span>
                        <div className="text-[#F25F4C] text-16 flex items-center justify-center py-auto space-x-2">
                          <button onClick={() => handleEditClick(todo)}>
                            <GoPencil />
                          </button>
                          <button onClick={() => deleteItem(todo.id)}>
                            <GoTrash />
                          </button>
                        </div>
                      </div>

                      {/* Priority below the task */}
                      {todo.priority && (
                        <div
                          className={`text-[11.69px] p-2 rounded-md ${
                            todo.priority.toLowerCase() === "high"
                              ? "text-high bg-priority w-10 h-6.5 "
                              : todo.priority.toLowerCase() === "medium"
                              ? "text-medium bg-priority w-16 h-6.3 "
                              : ""
                          }`}
                        >
                          {capitalizeFirstLetter(todo.priority)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="text-14 text-red-600 font-normal">
              No Todo Item available
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <IoIosAddCircle
            className="mt-4 md:mt-12 h-16 w-16 text-add cursor-pointer"
            onClick={handleToggleAddIcon}
          />
        </div>
      </div>
    </main>
  );
}
