import { atomFamily } from "jotai/utils"
import { atom, PrimitiveAtom, useAtom, useAtomValue, useSetAtom } from "jotai"
import { CloseOutlined, PlusOutlined} from "@ant-design/icons"
import { useForm, FormProvider} from "react-hook-form"
import React, { useEffect } from "react"
import { nanoid } from "nanoid"
import { Radio } from "antd"
import './index.css'

/**
 * todoFamily : todoをしまう
 * todoAtom : idのみしまう
 * filteredAtom : idのみしまう 
 *  これらのid配列に対して.filter, .mapをする
 * filterAtom : 表示切り替え
 * useFormは一個だけ？
 * 
 * 
 * titleが空のままフォーカスが外れたら、Todoを消したい。あとtrim()とかしたい
 * 多分、onChangeでうまくtitleの変更できてない
 * submithandlerってなに
 */

const todoAtomFamily = atomFamily<newTodo, PrimitiveAtom<Todo>>(
  (param) => 
    atom<Todo>({id: param.id, title: param.title || "No title", completed : false, deleted: false }),
  (a, b) => a.id === b.id
)
const todoAtom = atom<TodoId[]>([])
const filterAtom = atom<todoFilter>('all')
const filteredAtom = atom<TodoId[]>((get) => {
  const filter = get(filterAtom)
  const todos = get(todoAtom)
  switch(filter) {
    case "all":
      return todos
    case "completed":
      return todos.filter((todo) => get(todoAtomFamily({id: todo.id})).completed)
    case "incompleted":
      return todos.filter((todo) => !get(todoAtomFamily({id: todo.id})).completed)
    default:
      return todos
  }
})

const TodoItem = (prop: TodoId) => {
  const [item, setItem] = useAtom(todoAtomFamily({id: prop.id}))
  const toogelCompleted = () => {
    setItem((prev) => ({...prev, completed: !prev.completed}))
  }
  const handleDelete = () => {
    console.log("deleted")
    setItem((prev) => ({...prev, deleted: true}))
  }
  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItem((prev) => ({...prev, title: event.target.value}))
    console.log(item.title)
  }
  if( item.deleted ) return

  return (
    <div className="bblock flex justify-center items-center gap-x-2 px-2">
      <input
        id="isCompleted" 
        type="checkbox"
        checked={item.completed}
        onChange={toogelCompleted}
      />
      <input
        type="text"
        id="title"
        defaultValue={item.title}
        onChange={handleTitle}
        style={{ textDecoration: item.completed ? 'line-through' : '' }}
        className="w-10/12"
      />
      <CloseOutlined onClick={handleDelete} className="ml-auto"/>
    </div>
  )
}

const Filter = () => {
  const [filter ,setFilter] = useAtom(filterAtom)
  return (
    <div className="mb-5">
      <Radio.Group 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          switch(e.target.value) {
            case 'all':
              setFilter('all')
              break
            case 'completed':
              setFilter('completed')
              break
            case 'incompleted':
              setFilter('incompleted')
              break
            default :
            setFilter('all')
            break
          }
        }}
        value={filter}
      >
        <Radio value="all">All</Radio>
        <Radio value="completed">Completed</Radio>
        <Radio value="incompleted">Incompleted</Radio>
      </Radio.Group>
    </div>
  )
}

const CreateTodoForm = () => {
  // ぜったいref使ったほうが良くて草
  const methods = useForm<TodoTitle>();
  const setTodoAtom = useSetAtom(todoAtom)

  // formの値から新しいTodoを作る
  // 作れたら、formをresetする
  const onSubmit = (data:TodoTitle) => {
    console.log(data.title)
    const newId = nanoid()
    setTodoAtom((prev) => ([...prev, {id: newId}]))
    todoAtomFamily({id: newId, title: data.title.trim()})
    methods.reset()
  }
  // エラーメッセージを入れる
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
        <fieldset className="bblock focusblock flex justify-center items-center gap-x-2 p-2 mb-5">
          <input
            type="text"
            id="title"
            placeholder="Todo title ..."
            className="w-11/12"
            {...methods.register('title')}
          />
          {/* <PlusOutlined type="submit"/> */}
          <button type="submit" className="ml-auto flex justify-center items-center">
            <PlusOutlined />
          </button>
        </fieldset>
      </form>
    </FormProvider>
  )
}

export const TodoList = () => {
  const filteredTodoIds = useAtomValue(filteredAtom)

  return (
    <div className="w-[500px] flex flex-col justify-center items-center gap-y-4">
      <h1 className="pageTitle">TodoList</h1>
      <CreateTodoForm />
      <Filter />
      {filteredTodoIds.map((todo) => 
        <TodoItem id={todo.id} key={todo.id}/>
      )}
    </div>
  )
}