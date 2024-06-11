import { createContext, useContext, useReducer } from "react"

const TodosContext = createContext(null)
const TodosDispatchContent = createContext(null)

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: initialTodos,
    filter: 'all'
  });

  return (
    <TodosContext.Provider value={state}>
      <TodosDispatchContent.Provider value={dispatch}>
        {children}
      </TodosDispatchContent.Provider>
    </TodosContext.Provider>
  )
}

export function useTodos() {
  return useContext(TodosContext)
}

export function useTodosDispatch() {
  return useContext(TodosDispatchContent)
}

function todoReducer(state, action) {
  switch (action.type) {
    case 'added': {
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: action.id, text: action.text, completed: false }
        ]
      }
    }
    case 'changed': {
      return {
        ...state,
        todos: state.todos.map(t => {
          if (t.id === action.todo.id) {
            return action.todo;
          } else {
            return t;
          }
        })
      }
    }
    case 'deleted': {
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.id)
      }
    }
    case 'setFilter': {
      return {
        ...state,
        filter: action.filter
      }
    }
    case 'clearCompleted': {
      return {
        ...state,
        todos: state.todos.filter(t => !t.completed)
      }
    }
    default: {
      throw Error('Không có hành động: ' + action.type)
    }
  }
}

const initialTodos = [
  { id: 0, text: '📃 Task 01', completed: true },
  { id: 1, text: '📃 Task 02', completed: false },
  { id: 2, text: '📃 Task 03', completed: false }
];
