import axios from "axios"
import { Todolist ,InputForm} from "./Todolist"
import './index.css';
import { useEffect, useState } from "react";
import { isTodos } from "./lib/isTodo";

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

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3306",
  headers: {
    'Content-Type': 'application/json',
  },
})

export const handleClick = async () => {
  const body = JSON.stringify({ name: "hoge", email: "ok@sample.com" })
  await axiosInstance.post('/', body)
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

export default function App() {
  const [List, setList] = useState<{todos :Todo[]}>({todos : sampleList})

  // const addTodo = () => {
  //   const preTodos = List.todos;
  //   const newTodos = [...preTodos, ] 
  // }

  const handleGet1 = async () => {
    await axiosInstance.get('/')
      .then((res) => {
        const inData = res.data
        console.log(inData)
        if(isTodos(inData)){
          console.log("inData is type of Todo[]")
          var newTodos :Todo[] = []
          inData.map((todo) => {
            newTodos = [...newTodos, {id: todo.id, name: todo.name, checked: todo.checked}]
            setList({todos: newTodos})
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    console.log("List has been changed")
  },[List])

  return (
  <>
    <h1 className="m-5 text-3xl"> Todo List </h1>
    <div className="flex flex-col items-center">
      <div className="w-4/5 grid grid-cols-6 gap-2">
        <button className="col-span-1 h-10 my-2 bg-slate-100 rounded-lg btn" onClick={handleClick}>POST</button>
        <button className="col-span-1 h-10 my-2 bg-slate-100 rounded-lg btn" onClick={handleGet1}>GET</button>
        <button className="col-span-1 h-10 my-2 bg-slate-100 rounded-lg btn" onClick={handleClick}>POST</button>
        <button className="col-span-1 h-10 my-2 bg-slate-100 rounded-lg btn" onClick={handleClick}>POST</button>
        <button className="col-span-1 h-10 my-2 bg-slate-100 rounded-lg btn" onClick={handleClick}>POST</button>
        <button className="col-span-1 h-10 my-2 bg-slate-100 rounded-lg btn" onClick={handleClick}>POST</button>
      </div>
      <div className="w-4/5 h-screen">
        <InputForm />
        <Todolist list={List.todos}/>
      </div>
    </div>
  </>
  )
}

