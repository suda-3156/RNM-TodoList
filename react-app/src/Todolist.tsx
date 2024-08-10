import React from 'react'
import './index.css'

export type Todo = {
  id :number,
  name :string,
  done :boolean,
}

type todoListProps = {
  list :Todo[]
}

const TaskRow: React.FC<Todo> = ({id, name, done}) => {
  return(
    <div className='w-80% h-20 m-2 px-4 bg-slate-50 shadow-lg flex justify-start items-center gap-3 rounded-lg'>
      <input type="checkbox" name="" id="" />
      <p>{id}</p>
      <p>{name}</p>
      <p>{done}</p>
    </div>
  )
}

export const Todolist: React.FC<todoListProps> = ({list}) => {
  return (
    <div className='w-full h-full py-3'>
      {list.map((todo :Todo) => <TaskRow id = {todo.id} name={todo.name} done={todo.done} key={todo.id}/>)}
    </div>
  )
}