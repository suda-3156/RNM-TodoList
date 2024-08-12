import axios from "axios";
import { isTodos } from "./lib/isTodo";

/**
 * API controllers 
 */

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.6:3306/todolist/api",
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * GET API
 */

export type getAPIRequest = {
  url: '',
  id: string,
  crr: Todo[]
}

export type getAIPResponse = {
  errorType: 'success' | 'systemError' | 'axiosError' | 'jsonError',
  result : Todo[]
}

export const getAPI = async (Request :getAPIRequest) :Promise< getAIPResponse > => {
  try {
    const result = await axiosInstance.get(`${Request.url}/${Request.id}`)
    console.log(result.data);
    if(isTodos(result.data)) {
      console.log("type of result.data is Todo[]")
      return {
        errorType: 'success',
        result: result.data
      }
    } else {
      return { 
        errorType: 'jsonError',
        result: Request.crr
      }
    }
  } catch (error) {
    console.error(error)
    if (axios.isAxiosError(error)) {
      return {
        errorType: 'axiosError',
        result: Request.crr
      }
    } else {
      return {
        errorType: 'systemError',
        result: Request.crr
      }
    }
  }
}

/**
 * POST API
 */

export type postAPIRequest = {
  url: '',
  newTodo: {
    name: string,
    checked: boolean
  }
}
export type postAPIResponse = {
  errorType: 'success' | 'systemError' | 'axiosError' | 'invalidText'
}

export const postAPI = async (Request :postAPIRequest) :Promise<postAPIResponse> => {
  if (Request.newTodo.name === '') return {errorType: 'invalidText'}
  try {
    const res = await axiosInstance.post(`${Request.url}`, Request.newTodo)
    console.log(res)
    return {
      errorType: 'success'
    }
  } catch (error) {
    console.error(error)
    if (axios.isAxiosError(error)) {
      return {
        errorType: 'axiosError'
      }
    } else {
      return {
        errorType: 'systemError'
      }
    }
  }
}
