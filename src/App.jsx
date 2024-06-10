import { useState, useEffect } from "react";

let nextId = 0

export default function App() {

  const [lists, setLists] = useState([])

  const [todo, setTodo] = useState('')

  const [editingId, setEditingId] = useState(null);

  const handleTodoChange = (e) => {
    setTodo(e.target.value)
  }

  const handleListsChange = () => {
    if (event.key === 'Enter') {
      if (todo != '') {
        setLists([
          ...lists,
          { id: nextId++, text: todo, completed: false }
        ])
        setTodo('')
      }
    }
  }

  const handleDoubleClick = (id) => {
    setEditingId(id);
  };

  const handleBlur = () => {
    setEditingId(null);
  };

  const handleItemChange = (e, id) => {
    const updatedLists = lists.map(item =>
      item.id === id ? { ...item, text: e.target.value } : item
    );
    setLists(updatedLists);
  };

  const handleTodoDone = (e, id) => {
    const updatedLists = lists.map(item =>
      item.id === id ? { ...item, completed: e.target.checked } : item
    );
    setLists(updatedLists);
  }

  const [showLists, setShowLists] = useState(0);
  const [activeTodos, setActiveTodos] = useState([])
  const [completedTodos, setCompletedTodos] = useState([])
  const [visibleTodos, setVisibleTodos] = useState([])
  const [selectId, setSeclectId] = useState(0)

  useEffect(() => {
    setActiveTodos(lists.filter(items => !items.completed))
  }, [lists]);

  useEffect(() => {
    setCompletedTodos(lists.filter(items => items.completed))
  }, [lists]);

  useEffect(() => {
    setVisibleTodos(showLists == 1 ? activeTodos : (showLists == 2 ? completedTodos : lists));
  }, [showLists, lists, activeTodos, completedTodos]);

  const handleCheckButton = (id) => {
    setShowLists(id)
  }

  const listButtons = [
    {
      id: 0,
      text: "all",
    },
    {
      id: 1,
      text: "active",
    },
    {
      id: 2,
      text: "completed",
    },
  ]

  const ButtonLists = () => {
    return (
      <div className="flex gap-1">
        {
          listButtons.map(item =>
            <button key={item.id} type="button" onClick={() => {
              handleCheckButton(item.id)
              setSeclectId(item.id)
            }} className={"px-4 py-1 rounded-md " + (item.id == selectId && "border")}> {item.text}</button >
          )
        }
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-300 flex flex-col pt-20 px-3 items-center gap-5 box-">
      <h1 className="text-5xl font-bold">📓 Todo List</h1>
      <div className="flex flex-col bg-white max-w-[600px] w-full min-h-[432px] rounded py-4 px-5 shadow-md">
        <div className="flex">
          <input type="text" onChange={handleTodoChange} onKeyDown={handleListsChange} value={todo} className='border-b w-full p-2 mb-1 focus:outline-none' placeholder='Viết todo của bạn ở đây....' />
        </div>

        {
          visibleTodos.map((item) => (
            <div className="group border-b py-3 px-2 mb-1 relative" key={item.id}>
              <div className="peer flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={(e) => handleTodoDone(e, item.id)}
                  className="peer size-3.5 appearance-none rounded-sm border border-slate-300 flex-none accent-pink-500 checked:appearance-auto"
                />
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => handleItemChange(e, item.id)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => e.key === "Enter" && handleBlur(false)}
                    autoFocus
                    className="focus:outline-none w-full pr-4"
                  />
                ) : (
                  <span
                    className="peer-checked:text-slate-400 w-full pr-4 peer-checked:line-through"
                    onDoubleClick={() => handleDoubleClick(item.id)}
                  >
                    {item.text}
                  </span>
                )}
              </div>
              <button className="group-hover:opacity-100 opacity-0 transition-all absolute top-1/2 right-0 -translate-y-1/2 text-red-600 p-2" onClick={() => { setLists(lists.filter(a => a.id !== item.id)) }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))
        }

        <div className="flex justify-between items-center flex-wrap gap-2 text-sm text-gray-800 mt-auto">
          <div>
            <span>{activeTodos.length} item(s) left</span>
          </div>
          <ButtonLists />
          <div>
            <button type="button" onClick={() => { setLists(lists.filter(items => !items.completed)) }} className="px-4 py-1 rounded-md">Clear Completed</button >
          </div>
        </div>

      </div>
      <div className="text-center text-sm text-gray-500 font-mono tracking-[-0.08em]">
        <p>Nhấp đúp chuột vào việc cần làm để chỉnh sửa</p>
        <p>© AGL</p>
      </div>
    </div>
  )
}
