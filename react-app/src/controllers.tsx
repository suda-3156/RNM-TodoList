import axios from "axios";
import { isTodos } from "./lib/isTodo";

const ip = import.meta.env.VITE_IP



/**
 * API controllers 
 */
const axiosInstance = axios.create({
  baseURL: `http://${ip}:3001/api/v1/todoitems`,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * GET API
 */
export type getAPIRequest = {
  // url: '',
  id: string | "", 
}
export type getAIPResponse = {
  errorType: 'SUCCESS' | 'SYSTEM_ERROR' | 'AXIOS_ERROR' | 'JOSN_ERROR',
  result : Todo[] | null
}

export const getAPI = async (Request :getAPIRequest) :Promise<getAIPResponse > => {
  console.log('getAPI is called. id: ' + Request.id)
  try {
    const res = await axiosInstance.get(`/${Request.id}`)
    // console.log("getAPI response: " + res);
    if(isTodos(res.data)) {
      return {
        errorType: 'SUCCESS',
        result: res.data
      }
    } else {
      return { 
        errorType: 'JOSN_ERROR',
        result: null
      }
    }
  } catch (error) {
    console.error(error)
    if (axios.isAxiosError(error)) {
      return {
        errorType: 'AXIOS_ERROR',
        result: null
      }
    } else {
      return {
        errorType: 'SYSTEM_ERROR',
        result: null
      }
    }
  }
}

/**
 * PUT API
 */
export type putAPIRequest = {
  id: string,
  todo: Todo
}
export type putAPIResponse = {
  errorType: 'SUCCESS' | 'SYSTEM_ERROR' | 'AXIOS_ERROR' | 'INVALID_TYPE'
}

export const putAPI = async (Request :putAPIRequest) :Promise<putAPIResponse> => {
  console.log("putAPI is called. id: " + Request.id)
  if (Request.todo.title === '' || Request.todo.id === '') return {errorType: 'INVALID_TYPE'}
  try {
    await axiosInstance.put(`/${Request.id}`, Request.todo)
    return {
      errorType: 'SUCCESS'
    }
  } catch (error) {
    console.error(error)
    if (axios.isAxiosError(error)) {
      return {
        errorType: 'AXIOS_ERROR'
      }
    } else {
      return {
        errorType: 'SYSTEM_ERROR'
      }
    }
  }
}

/**
 * POST API
 */
export type postAPIRequest = {
  todo: Todo
}
export type postAPIResponse = {
  errorType: 'SUCCESS' | 'SYSTEM_ERROR' | 'AXIOS_ERROR' | 'INVALID_TYPE'
}

export const postAPI = async (Request :postAPIRequest) :Promise<postAPIResponse> => {
  console.log("run postAPI")
  if (Request.todo.id === '' || Request.todo.title === '') return {errorType: 'INVALID_TYPE'}
  try {
    const res = await axiosInstance.post(``, Request.todo)
    console.log(res)
    return {
      errorType: 'SUCCESS'
    }
  } catch (error) {
    console.error(error)
    if (axios.isAxiosError(error)) {
      return {
        errorType: 'AXIOS_ERROR'
      }
    } else {
      return {
        errorType: 'SYSTEM_ERROR'
      }
    }
  }
}

/**
 * DELETE API
 */
export type deleteAPIRequest = {
  url?: string,
  id: string
}
export type deleteAPIResponse = {
  errorType: 'SUCCESS' | 'SYSTEM_ERROR' | 'AXIOS_ERROR'
}

export const deleteAPI = async (Request :deleteAPIRequest) :Promise<deleteAPIResponse> => {
  console.log("deleteAPI is called. id: " + Request.id)
  try {
    const res = await axiosInstance.delete(`/${Request.id}`)
    console.log(res)
    return {
      errorType: 'SUCCESS'
    }
  } catch (error) {
    console.error(error)
    if (axios.isAxiosError(error)) {
      return {
        errorType: 'AXIOS_ERROR'
      }
    } else {
      return {
        errorType: 'SYSTEM_ERROR'
      }
    }
  }
}
