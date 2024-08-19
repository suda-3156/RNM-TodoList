import axios from "axios";
import { isTodos } from "./lib/isTodo";

const port = import.meta.env.VITE_IP



/**
 * API controllers 
 */

const axiosInstance = axios.create({
  baseURL: `http://${port}:3001/api/v1/todoitems`,
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
}
export type getAIPResponse = {
  errorType: 'success' | 'systemError' | 'axiosError' | 'jsonError',
  result : Todo[] | null
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
      console.log(result.data)
      return { 
        errorType: 'jsonError',
        result: null
      }
    }
  } catch (error) {
    console.error(error)
    if (axios.isAxiosError(error)) {
      return {
        errorType: 'axiosError',
        result: null
      }
    } else {
      return {
        errorType: 'systemError',
        result: null
      }
    }
  }
}

/**
 * PUT API
 */
export type putAPIRequest = {
  url: string,
  todo: Todo
}
export type putAPIResponse = {
  errorType: 'success' | 'systemError' | 'axiosError' | 'invalidType'
}

export const putAPI = async (Request :putAPIRequest) :Promise<putAPIResponse> => {
  if (Request.todo.title === '' || Request.todo.id === '') return {errorType: 'invalidType'}
  console.log("run putAPI with url : " + Request.url)
  try {
    const res = await axiosInstance.put(`${Request.url}`, Request.todo)
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

/**
 * POST API
 */
export type postAPIRequest = {
  url: string,
  todo: Todo
}
export type postAPIResponse = {
  errorType: 'success' | 'systemError' | 'axiosError' | 'invalidType'
}

export const postAPI = async (Request :postAPIRequest) :Promise<postAPIResponse> => {
  if (Request.todo.id === '') return {errorType: 'invalidType'}
  console.log("run postAPI with url : " + Request.url)
  try {
    const res = await axiosInstance.post(`${Request.url}`, Request.todo)
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

/**
 * DELETE API
 */
export type deleteAPIRequest = {
  url: '',
  id: string
}
export type deleteAPIResponse = {
  errorType: 'success' | 'systemError' | 'axiosError' 
}

export const deleteAPI = async (Request :deleteAPIRequest) :Promise<deleteAPIResponse> => {
  try {
    const res = await axiosInstance.delete(`/${Request.id}`)
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
