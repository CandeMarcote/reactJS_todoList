import React, { useState, useRef, useEffect } from "react";
import Todo from "./Todo";

const LOCAL_STORAGE_KEY = "todoApp.todos"

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

  useEffect(()=> {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (setTodos) setTodos(storedTodos)
  }, [])

  useEffect(()=> {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos];
    const newtodo = newTodos.find(todo => todo.id === id)
    newtodo.complete = !newtodo.complete;
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    e.preventDefault();
    if (inputRef.current.value.trim() === "") {
      inputRef.current.value = "";
      return
    }
    const newTodo = {
      name: inputRef.current.value,
      id: Date.now().toString(),
      complete: false
    };
    console.log(newTodo.id)
    setTodos([...todos, newTodo]);
    inputRef.current.value = "";
  }

  function todosLeft(){
    const todosLeft = todos.filter(todo => {
      if (!todo.complete) return todo;
    })

    return todosLeft.length
  }

  function handleCleanTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos);
  }

  return (
    <>
        <div>
          <ul>
            {todos.map(todo => {
              return <Todo toggleTodo={toggleTodo} todos={todos} todo={todo} key={todo.id} />
            })}
          </ul>
        </div>
        
      <form onSubmit={handleAddTodo}>
        <input ref={inputRef} type="text" placeholder="write a chore"></input>
        <button type="submit">Add chore</button>
        <button type="reset" onClick={handleCleanTodos}>Clear complete chores</button>
      </form>

      <div>
        {todosLeft()} chores left
      </div>
    </>
  )
}

export default TodoList