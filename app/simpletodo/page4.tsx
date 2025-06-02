"use client"

import { useState, useEffect } from "react"
import React from 'react'

type Todo = {
    id:number;
    text:string;
    completed:boolean;
}

const STORAGE_KEY = "todo";

const Todo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if(saved) {
        setTodos(JSON.parse(saved));
    }
  },[]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },[todos]);

  const addTodo = () => {
    if(!input.trim()) return;
    const newTodo:Todo = {
        id: Date.now(),
        text:input,
        completed:false,
    }
    setTodos(prev => [...prev, newTodo]);
    setInput("");
  }

  const removeTodo = (id:number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  const toggleTodo = (id:number) => {
    setTodos(prev => prev.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo));
  }

  return (
    <div className="max-w-md mx-auto">
        <h1 className="font-bold text-2xl">代办事项</h1>
        <div className="flex">
        <input
           className="flex-1"
           value={input}
           onChange={(e) => setInput(e.target.value)}
           onKeyDown={(e) => e.key === "Enter" && addTodo()}
           placeholder="请输入代办事项"
        />
        <button className="bg-blue-500" onClick={addTodo}>添加</button>
        </div>
        <ul>
            {todos.map(todo => 
                <li key={todo.id} className="flex">
                    <span 
                        onClick={() => toggleTodo(todo.id)}
                        className={`flex-1 ${todo.completed ? "line-through text-gray" : ""}`}
                    >{todo.text}</span>
                    <button onClick={() => removeTodo(todo.id)} className="text-red-500">删除</button>
                </li>
            )}
        </ul>
       {todos.length === 0 && <p>暂无代办事项</p>}
    </div>
  )
}

export default Todo