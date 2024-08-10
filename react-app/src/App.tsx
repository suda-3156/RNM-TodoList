import axios from "axios"
import { Todolist ,Todo} from "./Todolist"
import './index.css';

const sampleList :Todo[] = [
  {
    id: 1,
    name: "test1",
    done: false,
  },
  {
    id: 2,
    name: "test2",
    done: true,
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

  return (
  <>
    <div>
      <button onClick={handleClick}>post</button>
    </div>
    <Todolist list={sampleList}/>
  </>
  )
}

