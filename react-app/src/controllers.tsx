import axios from "axios";
import { isTodos } from "./lib/isTodo";


const axiosInstance = axios.create({
  baseURL: "http://192.168.1.6:3306",
  headers: {
    'Content-Type': 'application/json',
  },
})

type getAPIRequest = {
  url: string,
  id: string | null,
}

type getAIPResponse = {
  todos: Todo[],
}
// type getAPIError = {
//   errorType: 'systemError' | 'axiosError'
// }

export const getAPI = async (Request :getAPIRequest) :Promise< getAIPResponse | void > => {
  await axiosInstance.get(`${Request.url}/${Request.id}`)
    .then((res) => {
      console.log(res.data);
      if(isTodos(res.data)) {
        console.log("type of res.data is Todo[]")
        return {todos : res.data}
      } else {
        console.log("type of res.data is NOT Todo[]")
        // alert("jsonが想定の型ではありません。")
        return 'systemError'
      }
    })
    .catch((err) => {
      console.log(err)
      return 'axiosError'
    })
}

