import { useState, useContext } from "react"
import { useTodosDispatch } from "./TodosContext.jsx"

export default function AddTodo({ onAddTodo }) {
  const [text, setText] = useState('')
  const dispatch = useTodosDispatch()

  return (
    <>
      <input
        type="text"
        className='border-b w-full p-2 mb-1 focus:outline-none'
        placeholder='Viết todo của bạn ở đây....'
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={() => {
          if (event.key === 'Enter') {
            setText('')
            dispatch({
              type: "added",
              id: nextId++,
              text: text,
            })
          }
        }}
      />

    </>
  )
}
let nextId = 4