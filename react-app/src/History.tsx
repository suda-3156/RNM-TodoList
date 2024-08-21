/**
 * 履歴の表示と削除
 */

import { RedoOutlined, DeleteOutlined } from '@ant-design/icons'
import { useAtom, useAtomValue } from 'jotai'
import { deletedAtom, historyAtom, todoAtom, todoAtomFamily } from './store'
import { FC, useEffect, useRef, useState } from 'react'
import { deleteAPI, putAPI } from './controllers'
import './index.css'
import { animated, useSpring } from '@react-spring/web'


export const History = () => {
  const todoIds = useAtomValue(todoAtom)
  const [ toggle, setToggle ] = useAtom(historyAtom)
  const [ deletedTodoIds, setDeletedTodoIds] = useAtom(deletedAtom) 

  const handleClearTodos = async () => {
    console.log("clear all todos")
    console.log(deletedTodoIds)
    deletedTodoIds.map((todo) => {
      console.log("delete todo id: " + todo.id)
      // dbとatomFamilyとtodoIdsとdeletedIdsから消さなきゃいけない。だる！！
      // await deleteAPI({url: "", id: todo.id})
    })
  }
  
  const styles = useSpring({
    opacity: toggle ? 1 : 0.8,
    x: toggle ? 0 : 400,
    from: { x: 400},
  })

  const handleToggle = () => {
    setToggle(prev => !prev)
  }

  return (
    <animated.div style={styles} className='absolute top-0 right-0 z-20 w-[400px] h-screen bg-white border-l border-[#333333] flex flex-col justify-center gap-y-4'>
      <button className='px-5 h-32 text-8xl font-bold text-black whitespace-nowrap tracking-tighter' onClick={handleToggle}>
        History
      </button>
      <div className="w-full h-full overflow-y-scroll px-5">
        {todoIds.map((todo) => 
          <DeletedTodoItem id={todo.id} key={todo.id} />
        )}
      </div>
      <div className='h-16 w-full flex justify-center items-center'>
        <button className='h-4/5 w-3/4 px-10 py-2 flex justify-center items-center gap-x-10 bg-[#F03D30] rounded-3xl' onClick={handleClearTodos}>
          <p className='text-5xl font-medium whitespace-nowrap tracking-tighter text-white'>Clear</p>
          <DeleteOutlined className='w-12 h-12' style={{fontSize : '40px', color: 'white'}}/>
        </button>
      </div>
    </animated.div>
  )  
}

const DeletedTodoItem :FC<TodoId> = (prop) => {
  const [item, setItem] = useAtom(todoAtomFamily({id: prop.id}))
  const isFirstRender = useRef(true);


  useEffect(() => {

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    putAPI({url: `/${item.id}`, todo: item})
      .then((response) => console.log("Item Updated : " + response))
      .catch((error) => console.log(error))
      
  },[item])

  const handleUnDelete = () => {
    setItem((prev) => ({...prev, deleted: false}))
  }

  if( !item.deleted ) return 

  return (
    <div className="bblock flex justify-center items-center gap-x-2 px-2 mb-4">
      <input
        id="isCompleted" 
        type="checkbox"
        checked={item.completed}
        disabled={true}
      />
      <div className="w-11/12 overflow-hidden">
        <p
          style={{ textDecoration: item.completed ? 'line-through' : '' }}
          className="w-full text-nowrap"
        >
        {item.title}
        </p>
      </div>
      <RedoOutlined className="ml-auto" onClick={handleUnDelete}/>
    </div>
  )
}