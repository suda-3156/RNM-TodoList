/**
 * 履歴の表示と削除
 */

import { RedoOutlined, DeleteOutlined } from '@ant-design/icons'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { deletedTodoAtom, historyAtom, todoAtom, todoAtomFamily } from './store'
import { FC } from 'react'
import { deleteAPI, putAPI } from './controllers'
import './index.css'
import { animated, useSpring } from '@react-spring/web'


export const History = () => {
  const [deletedTodoIds, setDeletedTodoIds] = useAtom(deletedTodoAtom)
  const [ toggle, setToggle ] = useAtom(historyAtom)

  const handleClearTodos = async () => {
    console.log("clear all todos")
    for(const prop of deletedTodoIds) {
      await deleteAPI({id: prop.id})
        .then((response) => {
          switch(response.errorType) {
            case "SUCCESS":
              console.log("Item deleted. id: ",  prop.id)
              setDeletedTodoIds((prev) => prev.filter((todo) => todo.id !== prop.id))    
              todoAtomFamily.remove({id: prop.id})
              break
            default:
              console.error(response.errorType)
              break
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
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
        {deletedTodoIds.map((todo) => 
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
  const setTodoIds = useSetAtom(todoAtom)
  const setDeletedTodoIds = useSetAtom(deletedTodoAtom)

  const handleUnDelete = async () => {
    console.log("handleUnDelete is called")
    await putAPI({id: item.id, todo: {id: item.id, title: item.title, completed: item.completed, deleted: 0}})
      .then((response) => {
        switch(response.errorType) {
          case "SUCCESS":
            console.log("Item update : success")
            setItem((prev) => ({...prev, deleted: 0}))
            setDeletedTodoIds((prev) => prev.filter((todo) => todo.id !== item.id))
            setTodoIds((prev) => [...prev, {id: item.id}])
            break
          default:
            console.error(response.errorType)
            break
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleClear = async () => {
    await deleteAPI({id: item.id})
      .then((response) => {
        switch(response.errorType) {
          case "SUCCESS":
            console.log("Item deleted. id: ",  item.id)
            setDeletedTodoIds((prev) => prev.filter((todo) => todo.id !== item.id))    
            todoAtomFamily.remove({id: item.id})
            break
          default:
            console.error(response.errorType)
            break
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className="bblock flex justify-center items-center gap-x-2 px-2 mb-4">
      <input
        id="isCompleted" 
        type="checkbox"
        checked={item.completed === 1}
        disabled={true}
      />
      <div className="w-10/12 overflow-hidden">
        <p
          style={{ textDecoration: item.completed ? 'line-through' : '' }}
          className="w-full text-nowrap"
        >
        {item.title}
        </p>
      </div>
      <RedoOutlined className="ml-auto" onClick={handleUnDelete}/>
      <DeleteOutlined onClick={handleClear}/>
    </div>
  )
}