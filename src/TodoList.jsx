import { useState } from "react";
import { useTodos, useTodosDispatch } from "./TodosContext.jsx";

export default function TodoList() {
  const { todos, filter } = useTodos()

  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <ul>
      {filteredTodos.map(todo => (
        <li key={todo.id} className="group border-b py-3 px-2 mb-1 relative">
          <Todo todo={todo} />
        </li>
      ))}
    </ul>

  )
}

function Todo({ todo }) {
  const [isEditing, setIsEditing] = useState(null)
  const dispatch = useTodosDispatch()

  const handleBlur = () => {
    setIsEditing(null);
  };
  let todosContext
  if (isEditing === todo.id) {
    todosContext = (
      <>
        <input
          type="text"
          value={todo.text}
          onChange={e => {
            dispatch({
              type: 'changed',
              todo: {
                ...todo,
                text: e.target.value
              }
            })
          }}
          onKeyDown={(e) => e.key === "Enter" && handleBlur(false)}
          onBlur={handleBlur}
          className="focus:outline-none w-full pr-4"
          autoFocus
        />
      </>
    )
  }
  else {
    todosContext = (
      <>
        <span
          className="peer-checked:text-slate-400 w-full pr-4 peer-checked:line-through"
          onDoubleClick={() => setIsEditing(todo.id)}
        >
          {todo.text}
        </span>
      </>
    )
  }

  return (
    <div className="peer flex gap-2 items-center">
      <input
        type="checkbox"
        className="peer size-3.5 appearance-none rounded-sm border border-slate-300 flex-none accent-pink-500 checked:appearance-auto"
        checked={todo.completed}
        onChange={e => {
          dispatch({
            type: 'changed',
            todo: {
              ...todo,
              completed: e.target.checked
            }
          });
        }}
      />
      {todosContext}

      <button
        className="group-hover:opacity-100 opacity-0 transition-all absolute top-1/2 right-0 -translate-y-1/2 text-red-600 p-2"
        onClick={() => {
          dispatch({
            type: "deleted",
            id: todo.id
          })
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>

    </div>
  )
}