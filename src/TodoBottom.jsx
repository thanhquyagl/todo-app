import { useState } from "react"
import { useTodos, useTodosDispatch } from "./TodosContext"

const listButtons = [
  {
    id: 0,
    filter: "all"
  },
  {
    id: 1,
    filter: "active"
  },
  {
    id: 2,
    filter: "completed"
  },
]

export default function TodoBottom() {
  const [selectId, setSeclectId] = useState(0)
  const { todos } = useTodos()
  const dispatch = useTodosDispatch()

  const activeTodoCount = todos.filter(todo => !todo.completed).length;

  function ButtonLists() {
    return (
      <div className="flex gap-1">
        {
          listButtons.map(item =>
            <button
              key={item.id}
              type="button"
              onClick={() => {
                dispatch({ type: 'setFilter', filter: item.filter })
                setSeclectId(item.id)
              }}
              className={"px-4 py-1 rounded-md " + (item.id === selectId && "border")}
            >
              {item.filter}
            </button >
          )
        }
      </div>
    )
  }

  return (
    <div className="flex justify-between items-center flex-wrap gap-2 text-sm text-gray-800 mt-auto">
      <div>
        <span>{activeTodoCount} item(s) left</span>
      </div>
      <ButtonLists />
      <div>
        <button
          type="button"
          onClick={() =>
            dispatch({
              type: "clearCompleted",
            })
          }
          className="px-4 py-1 rounded-md"
        >
          Clear Completed
        </button >
      </div>
    </div >
  )
}