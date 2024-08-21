import { TodoList } from "./Todolist"
import { Provider } from "jotai"
import { History } from "./History"
import { Mask } from "./mask"



export default function App() {

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

