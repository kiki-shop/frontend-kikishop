import axios from 'axios'
import { BASE_URL_API } from '../utils/config'
const accessToken = localStorage.getItem('accessToken')
export const axiosPrivate = axios.create({
  baseURL: BASE_URL_API,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${accessToken}`
  }
})

export const axiosFormData = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${accessToken}`
  }
})

axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)
