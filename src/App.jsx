import { useState } from "react";

const MainButton = ({ active = "", children }) => {
  return (
    <button type="button" className={"px-4 py-1 rounded-md " + active}> {children}</button >
  )
}

let nextId = 0

export default function App() {

  const [lists, setLists] = useState([])

  const [todo, setTodo] = useState('')

  const [editingId, setEditingId] = useState(null);

  function handleTodoChange(e) {
    setTodo(e.target.value)
  }

  function handleListsChange() {
    if (event.key === 'Enter') {
      if (todo != '') {
        setLists([
          ...lists,
          { id: nextId++, todo: todo }
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
      item.id === id ? { ...item, todo: e.target.value } : item
    );
    setLists(updatedLists);

    if (e.keyCode === 13 || event.keyCode === 13 || e.key === 'Enter') {
      console.log(e.keyCode);
    }
  };

  return (
    <div className="min-h-screen bg-slate-300 flex flex-col pt-20 items-center gap-5">
      <h1 className="text-5xl font-bold">📓 Todo List</h1>
      <div className="flex flex-col bg-white w-[600px] min-h-[432px] rounded py-4 px-5 shadow-md">
        <div className="flex">
          <input type="text" onChange={handleTodoChange} onKeyDown={handleListsChange} value={todo} className='border-b w-full p-2 mb-1 focus:outline-none' placeholder='Viết todo của bạn ở đây....' />
        </div>

        {
          lists.map((item) => (
            <div className="group border-b py-3 px-2 mb-1 relative" key={item.id}>
              <div className="peer flex gap-2 items-center">
                <input className="peer size-3.5 appearance-none rounded-sm border border-slate-300 flex-none accent-pink-500 checked:appearance-auto" type="checkbox" name="1" />
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={item.todo}
                    onChange={(e) => handleItemChange(e, item.id)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => e.key === "Enter" && handleBlur(false)}
                    autoFocus
                    className="focus:outline-none w-full pr-4"
                  />
                ) : (
                  <span
                    className="peer-checked:text-slate-400 pr-4 peer-checked:line-through"
                    onDoubleClick={() => handleDoubleClick(item.id)}
                  >
                    {item.todo}
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

        <div className="flex justify-between items-center text-sm text-gray-800 mt-auto">
          <div>
            <span>{lists.length} item(s) left</span>
          </div>
          <div className="flex gap-1">
            <MainButton active="border">all</MainButton>
            <MainButton>active</MainButton>
            <MainButton>completed</MainButton>
          </div>
          <div>
            <MainButton>Clear Completed</MainButton>
          </div>
        </div>

      </div>
      <p className="text-center text-sm text-gray-500 font-mono">© AGL</p>
    </div>
  )
}
