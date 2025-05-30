"use client"

import React from 'react'
import { useState, useEffect } from 'react'

type User = {
    name:string
    id:number
    email:string
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        if(!res.ok) throw new Error("can't fetch info");
        const data = await res.json();
        setUsers(data);
    } catch(e) {
       if(e instanceof Error) {
        setError(e.message);
       } else{
        setError("unknown error");
       } 
    } finally {
        setLoading(false);
    }
  }
  fetchUsers()
},[])

  if(loading) return <p>Loading</p>
  if(error) return <p>error: {error}</p>

  return (
    <div>
    <ul>
     {users.map((user) => (
        <li key={user.id}>
            <p>{user.email}</p>
            <p>{user.name}</p>
        </li>
     ))}
    </ul>
    </div>
  )
}

export default UserList