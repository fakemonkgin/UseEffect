"use client"

import React from 'react'
import { useState, useEffect } from 'react'

type User = {
    id:number
    name:string
    email:string
    city:string
}

const UserList = () => {
  const[users,setUsers] = useState<User[]>([]);
  const[loading, setLoading] = useState(true);
  const[error, setError] = useState<string | null>(null);

useEffect(() => {
    async function fetchUser() {
        try{
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if(!res.ok) throw new Error("Connection error!");
        const data = await res.json();
        setUsers(data);
        } catch(e) {
            if(e instanceof Error) {
                setError(e.message);
            } else {
                setError("未知错误");
            }
        } finally {
            setLoading(false);
        }
    }
    fetchUser()
},[])

if(loading) return <p>Loading...</p>
if(error) return <p>Error:{error}</p>

  return (
        <div>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <p>{user.city}</p>
                        <p>{user.email}</p>
                        <p>{user.name}</p>
                    </li>
                ))}
            </ul>
        </div>
  )
}

export default UserList


