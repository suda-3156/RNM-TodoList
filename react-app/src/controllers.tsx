import axios from "axios";
import { isTodos } from "./lib/isTodo";

/**
 * API controllers 
 */

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.3:3306/api/v1/todoitems",
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
  url: '',
  todo: Todo
}

export type putAPIResponse = {
  errorType: 'success' | 'systemError' | 'axiosError' | 'invalidType'
}

export const putAPI = async (Request :putAPIRequest) :Promise<putAPIResponse> => {
  if (Request.todo.title === '' || Request.todo.id === '') return {errorType: 'invalidType'}
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
