import { TodoList } from "./Todolist"
import { Provider, useAtomValue } from "jotai"
import { History } from "./History"
import { Mask } from "./mask"
import { todoAtom } from "./store"
import { useAtomCallback } from "jotai/ts3.8/esm/react/utils"
import { useCallback } from "react"



export default function App() {
  const todoIds = useAtomValue(todoAtom)

  useCallback(() => {
    console.log("todoIds is updated" + todoIds)
  },[todoIds])

  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center overflow-hidden">
      <Provider>
        <History />
        <Mask />
        <TodoList />
      </Provider>
    </div>
  )
}

