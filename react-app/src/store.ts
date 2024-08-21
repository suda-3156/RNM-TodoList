import { atomFamily } from "jotai/utils"
import { PrimitiveAtom, atom } from "jotai"

export const todoAtomFamily = atomFamily<newTodo, PrimitiveAtom<Todo>>(
  (param) => 
    atom<Todo>({id: param.id, title: param.title || "No title", completed : param.completed || 0, deleted: param.deleted || 0}),
  (a, b) => a.id === b.id
)
export const todoAtom = atom<TodoId[]>([])
export const deletedTodoAtom = atom<TodoId[]>([])
export const filterAtom = atom<todoFilter>('all')
export const filteredAtom = atom<TodoId[]>((get) => {
  const filter = get(filterAtom)
  const todos = get(todoAtom)
  switch(filter) {
    case "all":
      return todos
    case "completed":
      return todos.filter((todo) => get(todoAtomFamily({id: todo.id})).completed)
    case "incompleted":
      return todos.filter((todo) => !get(todoAtomFamily({id: todo.id})).completed)
  }
})

export const historyAtom = atom(false)