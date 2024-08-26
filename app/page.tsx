"use client";

import { useState, useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";
import AddTodo from "./components/AddTodo";

export default function Home() {
  const [showAddTodo, setShowAddTodo] = useState(false);
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = (todo: { text: string }) => {
    const id = Math.floor(Math.random() * 1000) + 1;
    const newTodo = { id, ...todo };
    setTodos([...todos, newTodo]);
  };

  const deleteItem = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-16 bg-grey">
      <div className="flex flex-col font-bold bg-background w-[350px] md:w-[550px] h-auto p-4 md:p-4 rounded-xl text-24">
        <div className="text-left mb-4">To Do List</div>

        {/* AddTodo Component */}
        {showAddTodo && <AddTodo onAdd={addTask} />}

        {/* To-Do items */}
        <div className="flex-grow">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <div key={todo.id} className="flex justify-between items-center mb-2">
                <span>{todo.text}</span>
                <button
                  onClick={() => deleteItem(todo.id)}
                  className="text-red-500"
                >
                  
                </button>
              </div>
            ))
          ) : (
            <div>No Todo Item available</div>
          )}
        </div>

        {/* Add icon positioned at the bottom right */}
        <div className="flex justify-end">
          <IoIosAddCircle
            className="mt-4 md:mt-12 h-16 w-16 text-add cursor-pointer"
            onClick={() => setShowAddTodo(!showAddTodo)}
          />
        </div>
      </div>
    </main>
  );
}
