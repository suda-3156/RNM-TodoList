import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { CloseOutlined, PlusOutlined} from "@ant-design/icons"
import { useForm, FormProvider } from "react-hook-form"
import { useEffect, useRef } from "react"
import { nanoid } from "nanoid"
import { Radio, RadioChangeEvent } from "antd"
import './index.css'
import { getAPI, putAPI, postAPI } from "./controllers"
import { todoAtom, todoAtomFamily, filterAtom, filteredAtom, historyAtom, deletedTodoAtom } from "./store"

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
 * submithandlerってなに
 */

const TodoItem = (prop: TodoId) => {
  const [item, setItem] = useAtom(todoAtomFamily({id: prop.id}))
  const methods = useForm<TodoTitle>()
  const setTodoIds = useSetAtom(todoAtom)
  const setDeletedTodoIds = useSetAtom(deletedTodoAtom)

  const toogelCompleted = async () => {
    await putAPI({id: item.id, todo: {id: item.id, title: item.title, completed: (item.completed === 1)? 0 : 1, deleted: item.deleted}})
      .then((response) => {
        switch(response.errorType) {
          case "SUCCESS":
            console.log("Item update : success")
            setItem((prev) => ({...prev, completed: (prev.completed === 1)? 0 : 1}))
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
  const handleDelete = async () => {
    await putAPI({id: item.id, todo: {id: item.id, title: item.title, completed: item.completed, deleted: 1}})
      .then((response) => {
        switch(response.errorType) {
          case "SUCCESS":
            console.log("Item update : success")
            setItem((prev) => ({...prev, deleted: 1}))
            setTodoIds((prev) => prev.filter((todo) => todo.id !== item.id))
            setDeletedTodoIds((prev) => [...prev, {id: item.id}])
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

  const onSubmit = async (data: TodoTitle) => {
    const newTitle = data.title.trim() || "No title"
    await putAPI({id: item.id, todo: {id: item.id, title: newTitle, completed: item.completed, deleted: item.deleted}})
      .then((response) => {
        switch(response.errorType) {
          case "SUCCESS":
            console.log("Item update : success")
            setItem((prev) =>  ({...prev, title:newTitle}))
            methods.setValue('title', newTitle) // useEffect多用しないほうがいいのかなあ、と。
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

  // エラー出た時のために、やめておく

  // const updateItem = async () => {
  //   console.log(item)
  //   await putAPI({id: item.id, todo: item})
  //     .then((response) => {
  //       switch(response.errorType) {
  //         case "SUCCESS":
  //           console.log("Item update : success")
  //           break
  //         default:
  //           console.error(response.errorType)
  //           break
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  // }

  // useEffect(() => {
  //   if(isFirstRender) {
  //     setIsFirstRender(false)
  //     return
  //   }
  //   console.log("updateItem is called.")
  //   updateItem()
  // },[item])

  return (
    <div className="bblock flex justify-center items-center gap-x-2 px-2 mb-4">
        <input
          id="isCompleted" 
          type="checkbox"
          checked={item.completed === 1}
          onChange={toogelCompleted}
        />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="w-11/12">
          <input
            type="text"
            id="title"
            defaultValue={item.title}
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
        className="flex gap-x-5"
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

  const onSubmit = async (data:TodoTitle) => {
    try {
      const newId = nanoid()
      const newTitle = data.title.trim() || "No title"
      setTodoAtom((prev) => ([...prev, {id: newId}]))
      todoAtomFamily({id: newId, title: newTitle})
      await postAPI({todo: {id: newId, title: newTitle, completed: 0, deleted: 0}})
    } catch (error) {
      console.error("Failed to submit todo:", error )
    } finally {
      methods.reset()
    }
  }

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
  const [deletedTodoIds, setDeletedTodoIds] = useAtom(deletedTodoAtom)
  const isFirstLoad = useRef(true); // 初回ロードを追跡
  // const [ isFirstRender, setIsFirstRender ] = useState(false) // こっちは何故か使えない　？？？？？

  const setToggle = useSetAtom(historyAtom)

  const handleToggle = () => {
    setToggle(prev => !prev)
  }
  
  useEffect(() => {
    if ( isFirstLoad.current ) {    
      getAPI({id: ''})
        .then((res) => {
          switch(res.errorType) {
            case "SUCCESS":
              const todos :Todo[] = res.result ?? []
              todos.map((todo) => {
                if (!todoIds.some(item => item.id === todo.id) && !todo.deleted) {
                  setTodoIds((prev) => [...prev, { id: todo.id }])
                  todoAtomFamily(todo)
                }
                if (!deletedTodoIds.some(item => item.id === todo.id) && todo.deleted) {
                  setDeletedTodoIds((prev) => [...prev, { id: todo.id }])
                  todoAtomFamily(todo)
                }
              })
              break
            default:
              console.error(res.errorType)
              break
          }
        })
        .catch(error => console.log(error))
      isFirstLoad.current = false; // 初回ロードを終了
    }
  },[setTodoIds])

  useEffect(() => {
    console.log("todoIds: " + todoIds.map((todo) => todo.id))
  },[todoIds])
  useEffect(() => {
    console.log("deletedTodoIds: " + deletedTodoIds.map((todo) => todo.id))
  },[deletedTodoIds])

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