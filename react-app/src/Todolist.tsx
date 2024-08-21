import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { CloseOutlined, PlusOutlined} from "@ant-design/icons"
import { useForm, FormProvider} from "react-hook-form"
import { useEffect, useRef } from "react"
import { nanoid } from "nanoid"
import { Radio, RadioChangeEvent } from "antd"
import './index.css'
import { getAPI, putAPI, postAPI } from "./controllers"
import { todoAtom, todoAtomFamily, filterAtom, filteredAtom, historyAtom, deletedAtom } from "./store"

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


// const firstLoad = atom<boolean>(false)

const TodoItem = (prop: TodoId) => {
  const isFirstRender = useRef(true)
  const [deletedTodoIds, setDeletedTodoIds] = useAtom(deletedAtom)

  const [item, setItem] = useAtom(todoAtomFamily({id: prop.id}))
  const methods = useForm<TodoTitle>()
  const toogelCompleted = () => {
    setItem((prev) => ({...prev, completed: !prev.completed}))
  }
  const handleDelete = () => {
    console.log("deleted")
    setItem((prev) => ({...prev, deleted: true}))
    setDeletedTodoIds((prev) => [...prev, {id: prop.id}])
    console.log(deletedTodoIds)
  }
  const onSubmit = (data: TodoTitle) => {
    const newTitle = data.title.trim() || "No title"
    console.log("newTitle: " + newTitle)
    setItem((prev) =>  ({...prev, title:newTitle}))     
    console.log("title: " + item.title)
  }

  useEffect(() => {

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    putAPI({url: `/${item.id}`, todo: item})
      .then((response) => console.log("Item Updated : " + response))
      .catch((error) => console.log(error))
      
  },[item])

  if( item.deleted ) return 

  return (
    <div className="bblock flex justify-center items-center gap-x-2 px-2 mb-4">
        <input
          id="isCompleted" 
          type="checkbox"
          checked={item.completed}
          onChange={toogelCompleted}
        />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-11/12">
          <input
            type="text"
            id="title"
            // defaultValue={item.title}
            key={item.title}
            defaultValue={item.title}  // valueをwatchで管理
            // onChange={(e) => {
            //   methods.setValue("title", e.target.value);
            // }}
            style={{ textDecoration: item.completed ? 'line-through' : '' }}
            className="w-full"
            {...methods.register('title')}
          />
        </form>
        <CloseOutlined onClick={handleDelete} className="ml-auto"/>
      </FormProvider>
    </div>
  )
}

const Filter = () => {
  const [filter ,setFilter] = useAtom(filterAtom)

  const handleRadioChange = (e: RadioChangeEvent) => {
    const value = e.target.value as 'all' | 'completed' | 'incompleted'
    setFilter(value)
  }
  return (
    <div className="mb-5">
      <Radio.Group 
        onChange={handleRadioChange}
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
  const methods = useForm<TodoTitle>();
  const setTodoAtom = useSetAtom(todoAtom)

  // formの値から新しいTodoを作る
  const onSubmit = async (data:TodoTitle) => {
    try {
      const newId = nanoid()
      const newTitle = data.title.trim() || "No title"
      setTodoAtom((prev) => ([...prev, {id: newId}]))
      todoAtomFamily({id: newId, title: newTitle})
      await postAPI({url: "", todo: {id: newId, title: newTitle, completed: false, deleted: false}})
      // await putAPI({url: `/${newId}`, todo: useAtomValue(todoAtomFamily({id: newId}))}) // こっちはinvalid hooks 
    } catch (error) {
      console.error("Failed to submit todo:", error )
    } finally {
      methods.reset()
    }
  }
  // エラーメッセージを入れる
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full px-4">
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
  const [todoIds, setTodoIds] = useAtom(todoAtom)
  const isFirstLoad = useRef(true); // 初回ロードを追跡
  const setToggle = useSetAtom(historyAtom)

  const handleToggle = () => {
    setToggle(prev => !prev)
  }
  
  useEffect(() => {
    if ( isFirstLoad.current ) {    
      getAPI({url: '', id: ''})
        .then((res) => {
          switch(res.errorType) {
            case "success":
              const todos :Todo[] = res.result ?? []
              todos.map((todo) => {
                if (!todoIds.some(item => item.id === todo.id)) {
                  setTodoIds((prev) => [...prev, { id: todo.id }])
                  todoAtomFamily(todo)
                  console.log(todo)
                }
              })
              break
            default:
              alert(res.errorType)
              break
          }
        })
        .catch(error => console.log(error))
        .finally(() => {
          console.log("todoIds is updated")
          console.log(todoIds)
        })
        isFirstLoad.current = false; // 初回ロードを終了
    }
  },[setTodoIds])

  return (
    <div className="max-w-[600px] min-w-[400px] w-full h-full flex flex-col justify-center items-center gap-y-4">
      <h1 className="text-[min(max(13vw,90px),160px)] font-extrabold tracking-tighter text-black whitespace-nowrap">TodoList</h1>
      <CreateTodoForm />
      <Filter />
      <div className="w-full h-full p-4 overflow-y-scroll">
        {filteredTodoIds.map((todo) => 
          <TodoItem id={todo.id} key={todo.id}/>
        )}
      </div>
        <div className="w-full h-20 p-5 flex justify-end">
          <button onClick={handleToggle} className="w-[100px] h-full text-2xl font-semibold hover:text-[#3B83F6] opacity-95"> History </button>
        </div>
    </div>
  )
}