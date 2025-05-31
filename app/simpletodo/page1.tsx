"use client"
import React from 'react'
import  { useState, useEffect } from "react";

type Todo = {
    id:number;
    text:string;
    completed:boolean;
};

const LOCAL_STORAGE_KEY = "todo-lists";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(saved) {
        setTodos(JSON.parse(saved));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos])

  const addTodo = () => {
    if(!input.trim()) return;
    const newTodo: Todo = {
        id: Date.now(),
        text: input.trim(),
        completed:false
    }
    setTodos(prev => [...prev, newTodo]);
    setInput("");
  }

  const removeTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(
        todo => todo.id === id ? {...todo, completed: !todo.completed} : todo
    ));
  };

  return (
    <div className='max-w-md mx-auto p-4'>
        <h1 className='font-bold text-2xl'>待办事项</h1>
        <div className='flex gap-2 my-2'>
            <input 
                className='border p-2 flex-1'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
                placeholder='请输入代办事件'
            />
            <button 
                className='bg-blue-500 text-white px-3 py-2'
                onClick={addTodo}
                >
                添加
            </button>
        </div>
        <ul className='space-y-2'>
            {todos.map(todo => 
                <li
                key={todo.id}    
                className='flex justify-between items-center border p-2 rounded'    
                >
                <span onClick={() => toggleTodo(todo.id)} 
                      className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-gray-300" : ""}`}
                    >
                    {todo.text}
                </span>
                <button onClick={() => removeTodo(todo.id)} className='text-red-500 hover:underline ml-2' >
                    删除
                </button>
                </li>
            )}
        </ul>
        {todos.length === 0 && <p>暂无代办事项</p>}
    </div>
  )
}

export default TodoList
