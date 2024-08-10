import axios from "axios"

const baseurl :string= "http://localhost:3306"

export const handleClick = async () => {
  const body = JSON.stringify({ name: "hoge", email: "ok@sample.com" })
  await axios.post(baseurl+'/', body)
    .then((res) => {
      console.log(res)
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
  </>)
}

