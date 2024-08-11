import React from 'react'
import './index.css'

type todoListProps = {
  list :Todo[]
}

const TaskRow: React.FC<Todo> = ({id, name, checked}) => {
  return(
    <div className='w-full h-10 p-4 my-2 bg-slate-100 shadow-lg shadow-gray-200 flex justify-start items-center gap-3 rounded-lg'>
      <input type="checkbox" name="" id="" />
      <p>{id}</p>
      <p>{name}</p>
      <p>{checked}</p>
    </div>
  )
}

export const Todolist: React.FC<todoListProps> = ({list}) => {
  return (
    <div className='w-full h-full py-3'>
      {list.map((todo :Todo) => <TaskRow id = {todo.id} name={todo.name} checked={todo.checked} key={todo.id}/>)}
    </div>
  )
}

export const InputForm: React.FC = () => {
  return(
    <div className='w-full h-10 my-2 px-4 bg-slate-100 shadow-lg shadow-gray-200 flex justify-start items-center gap-3 rounded-lg'>
      <input type="text" className='w-full h-full bg-transparent outline-none' placeholder='新しいTodoを追加'/>
    </div>
  )
}