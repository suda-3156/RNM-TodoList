import { TodoList } from "./Todolist"

// const sampleList :Todo[] = [
//   {
//     id: 1,
//     name: "test1",
//     checked: false,
//   },
//   {
//     id: 2,
//     name: "test2",
//     checked: true,
//   }
// ]

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
    <div className="w-full p-10 bg-white flex flex-col justify-center items-center">
      <TodoList />
    </div>
  )
}

