import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import { TodoProvider } from "./TodosContext";
import Footer from "./Footer";
import TodoBottom from "./TodoBottom";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-300 flex flex-col pt-20 px-3 items-center gap-5 box-" >
      <h1 className="text-5xl font-bold">📓 Todo List</h1>
      <div className="flex flex-col bg-white max-w-[600px] w-full min-h-[432px] rounded py-4 px-5 shadow-md">
        <TodoProvider>
          <AddTodo />
          <TodoList />
          <TodoBottom />
        </TodoProvider>
      </div>
      <Footer />
    </div >
  )
}