import { Todolist ,InputForm} from "./Todolist"
import './index.css';
import { useEffect, useState } from "react";
import { getAPI, getAIPResponse, postAPI} from "./controllers";

const sampleList :Todo[] = [
  {
    id: 1,
    name: "test1",
    checked: false,
  },
  {
    id: 2,
    name: "test2",
    checked: true,
  }
]

// getAPI すべてのTodoを読み込む
export const getAllTodos = async () => {
  const res :getAIPResponse = await getAPI({url : '', id: '', crr: List.todos})
  if(res.errorType === 'success'){
    setList({todos : res.result})
  } else {
    console.log(res.errorType)
    alert("エラー：タスクの読み込みに失敗しました。")
  }
}

// postAPIのハンドラー
export const handlePostAPI = async (newTodoName :string) => {
  const postResponse = await postAPI({url: '', newTodo: {name: newTodoName, checked: false }})
  switch(postResponse.errorType){
    case 'success':
      console.log("タスクの追加が完了しました。")
      break
    case 'invalidText':
      alert("エラー : invalid text")
      break
    default:
      console.log(postResponse.errorType)
      alert("エラー : タスクの追加に失敗しました。")
  }
  await getAllTodos()
}

export default function App() {
  const [List, setList] = useState<{todos :Todo[]}>({todos : sampleList})

  // 初回読み込み
  useEffect(() => {
    console.log("List has been changed")
  },[List])
  
  return (
  <>
    <h1 className="m-5 text-3xl"> Todo List </h1>
    <div className="flex flex-col items-center">
      {/* テスト用のボタンたち */}
      <div className="w-4/5 grid grid-cols-6 gap-2">
        <button className="col-span-1 h-10 my-2 bg-slate-100 rounded-lg btn" onClick={getAllTodos}>GET</button>
        <button className="col-span-1 h-10 my-2 bg-slate-100 rounded-lg btn" onClick={getAllTodos}>RELOAD</button>
      </div>
      <div className="w-4/5 h-screen">
        <InputForm />
        <Todolist list={List.todos}/>
      </div>
    </div>
  </>
  )
}

