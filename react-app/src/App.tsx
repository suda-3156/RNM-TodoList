import { TodoList } from "./Todolist"
import { Provider } from "jotai"
import { History } from "./History"
import { Mask } from "./mask"

// // getAPI すべてのTodoを読み込む
// export const getAllTodos = async () => {
//   const res :getAIPResponse = await getAPI({url : '', id: '', crr: List.todos})
//   if(res.errorType === 'success'){
//     setList({todos : res.result})
//   } else {
//     console.log(res.errorType)
//     alert("エラー：タスクの読み込みに失敗しました。")
//   }
// }

// // postAPIのハンドラー
// export const handlePostAPI = async (newTodoName :string) => {
//   const postResponse = await postAPI({url: '', newTodo: {name: newTodoName, checked: false }})
//   switch(postResponse.errorType){
//     case 'success':
//       console.log("タスクの追加が完了しました。")
//       break
//     case 'invalidText':
//       alert("エラー : invalid text")
//       break
//     default:
//       console.log(postResponse.errorType)
//       alert("エラー : タスクの追加に失敗しました。")
//   }
//   await getAllTodos()
// }

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

