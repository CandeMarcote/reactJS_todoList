import React from 'react'

const Todo = ({ todo, toggleTodo } ) => {
  function handleClickTodo() {
    toggleTodo(todo.id)
  }

  return (
    <li>
        <label>
            <input type="checkbox" id={todo.name+todo.id} checked={todo.complete} onChange={handleClickTodo} />
            {todo.name}
        </label>
    </li>
  )
}

export default Todo