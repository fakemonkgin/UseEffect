// // // "use client"

// // // import React, { useState, useEffect } from 'react';

// // // type Todo = {
// // //   id: number;
// // //   text: string;
// // //   completed: boolean;
// // // };

// // // const LOCAL_STORAGE_KEY = "my-todo-list";

// // // const PersistentTodoList = () => {
// // //   const [todos, setTodos] = useState<Todo[]>([]);
// // //   const [input, setInput] = useState<string>("");

// // //   // ✅ 1. 加载本地数据（仅运行一次）
// // //   useEffect(() => {
// // //     const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
// // //     if (saved) {
// // //       setTodos(JSON.parse(saved));
// // //     }
// // //   }, []);

// // //   // ✅ 2. 每当 todos 变化就保存到本地
// // //   useEffect(() => {
// // //     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
// // //   }, [todos]);

// // //   // ✅ 3. 添加新任务
// // //   const addTodo = () => {
// // //     if (!input.trim()) return;
// // //     const newTodo: Todo = {
// // //       id: Date.now(),
// // //       text: input.trim(),
// // //       completed: false,
// // //     };
// // //     setTodos(prev => [...prev, newTodo]);
// // //     setInput("");
// // //   };

// // //   // ✅ 4. 删除任务
// // //   const removeTodo = (id: number) => {
// // //     setTodos(prev => prev.filter(todo => todo.id !== id));
// // //   };

// // //   // ✅ 5. 切换完成状态
// // //   const toggleTodo = (id: number) => {
// // //     setTodos(prev =>
// // //       prev.map(todo =>
// // //         todo.id === id ? { ...todo, completed: !todo.completed } : todo
// // //       )
// // //     );
// // //   };

// // //   return (
// // //     <div className="p-4 max-w-md mx-auto">
// // //       <h1 className="text-2xl font-bold mb-4">✅ 待办清单</h1>
// // //       <div className="flex gap-2 mb-4">
// // //         <input
// // //           className="border p-2 flex-1"
// // //           value={input}
// // //           onChange={(e) => setInput(e.target.value)}
// // //           onKeyDown={(e) => e.key === "Enter" && addTodo()}
// // //           placeholder="添加一件事..."
// // //         />
// // //         <button onClick={addTodo} className="bg-blue-500 text-white px-3 py-2 rounded">
// // //           添加
// // //         </button>
// // //       </div>
// // //       <ul className="space-y-2">
// // //         {todos.map(todo => (
// // //           <li
// // //             key={todo.id}
// // //             className="flex justify-between items-center border p-2 rounded"
// // //           >
// // //             <span
// // //               className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-gray-400" : ""}`}
// // //               onClick={() => toggleTodo(todo.id)}
// // //             >
// // //               {todo.text}
// // //             </span>
// // //             <button
// // //               onClick={() => removeTodo(todo.id)}
// // //               className="text-red-500 hover:underline ml-2"
// // //             >
// // //               删除
// // //             </button>
// // //           </li>
// // //         ))}
// // //       </ul>
// // //       {todos.length === 0 && <p className="text-gray-500 mt-4">暂无待办事项</p>}
// // //     </div>
// // //   );
// // // };

// // // export default PersistentTodoList;

// // "use client"
// // import { useState, useEffect } from "react"
// // import React from 'react'

// // type Todo = {
// //     id:number;
// //     text:string;
// //     completed:boolean;
// // }

// // const LOCAL_STORAGE_KEY = "todo-lists";

// // const Todo = () => {
// //   const [todos, setTodos] = useState<Todo[]>([]);
// //   const [input, setInput] = useState<string>("");

// //   useEffect(() => {
// //     const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
// //     if(saved) {
// //         setTodos(JSON.parse(saved));
// //     }
// //   }, []);

// //   useEffect(() => {
// //     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
// //   }, [todos]);

// //   const addTodo = () => {
// //     if(!input.trim()) return;
// //     const newTodo: Todo = {
// //         id: Date.now(),
// //         text: input,
// //         completed: false,
// //     }
// //     setTodos(prev => [...prev, newTodo]);
// //     setInput("");
// //   }

// //   const removeTodo = (id: number) => {
// //     setTodos(prev => prev.filter(todo => todo.id !== id));
// //   }

// //   const toggleTodo = (id: number) => {
// //     setTodos(prev => prev.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
// //   }

// //   return (
// //     <div className="max-w-md mx-auto p-4">
// //         <h1 className="font-bold text-2xl">代办事项</h1>
// //         <div className="flex gap-2 my-2">
// //             <input
// //                 className="flex-1 border p-2"
// //                 value={input}
// //                 onChange={(e) => setInput(e.target.value)}
// //                 onKeyDown={(e) => e.key === "Enter" && addTodo()}
// //                 placeholder="输入待办事项"      
// //             />
// //             <button onClick={addTodo} className="bg-blue-500 text-white px-3 py-2">添加</button>
// //         </div>
// //         <ul className="space-y-2">
// //             {todos.map(todo =>
// //             <li key={todo.id} className="flex justify-between items-center border p-2 rounded">
// //                 <span onClick={() => toggleTodo(todo.id)} className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-gray-400" : ""}`}>{todo.text}</span>
// //                 <button onClick={() => removeTodo(todo.id)} className="text-red-500">删除</button>
// //             </li> 
// //             )}
// //         </ul>
// //         {todos.length === 0 && <p>暂时没有代办事项</p>}
// //     </div>
// //   )
// // }

// // export default Todo

// "use client"

// import { useState, useEffect } from "react"
// import React from 'react'

// type Todo = {
//     id:number;
//     text:string;
//     completed:boolean;
// }

// const STORAGE_KEY = "todo-list";

// const Todo = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [input, setInput] = useState<string>("");

//   useEffect(() => {
//     const saved = localStorage.getItem(STORAGE_KEY);
//     if(saved) {
//         setTodos(JSON.parse(saved));
//     }
//   },[])

//   useEffect(() => {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
//   },[todos])

//   const addTodo = () => {
//     if(!input.trim()) return;
//     const newTodo: Todo = {
//         id: Date.now(),
//         text:input.trim(),
//         completed:false,
//     }
//     setTodos(prev => [...prev, newTodo]);
//     setInput("");
//   }

//   const removeTodo = (id:number) => {
//     setTodos(prev => prev.filter(todo => todo.id !== id));
//   }

//   const toggleTodo = (id:number) => {
//     setTodos(prev => prev.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
//   }


//   return (
//     <div className="max-w-md mx-auto">
//         <h1 className="font-bold text-2xl">代办事项</h1>
//         <div className="flex gap-2 my-2">
//             <input
//             className="flex-1 border p-2"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && addTodo()}
//             placeholder="请输入代办事项"
//             />
//             <button className="bg-blue-500 rounded text-white p-2" onClick={addTodo}>
//                添加
//             </button>
//         </div>
//         <ul className="space-y-2">
//            {todos.map(todo => 
//             <li key={todo.id} className="flex justify-between items-center border p-2">
//                 <span onClick={() => toggleTodo(todo.id)}
//                   className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-400' : ''}`}
//                   >{todo.text}</span>
//                 <button onClick={() => removeTodo(todo.id)} className="text-red-500">删除</button>
//             </li>
//            )}
//         </ul>
//         {todos.length === 0 && <p>暂无代办事项</p>}
//     </div>
//   )
// }

// export default Todo

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
        <div className="flex gap-2 my-2">
        <input
           className="flex-1 p-2 border"
           value={input}
           onChange={(e) => setInput(e.target.value)}
           onKeyDown={(e) => e.key === "Enter" && addTodo()}
           placeholder="请输入代办事项"
        />
        <button className="bg-blue-500 p-2" onClick={addTodo}>添加</button>
        </div>
        <ul className="space-y-2">
            {todos.map(todo => 
                <li key={todo.id} className="flex border p-2">
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