import axios from 'axios'
import { getToken } from "@/utils/auth";
import {
  Message
} from 'element-ui'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, 
  // baseURL: process.env.VUE_APP_BASE_API, 
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    config.headers['authorization'] = getToken()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 相应拦截器
service.interceptors.response.use(
  res => {
    if (res.status == 200) {
      return Promise.resolve(res.data);
    } else {
      Message({
        message: '请求失败',
        type: 'error',
        duration: 2000
      })
      return Promise.reject(res.data)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service