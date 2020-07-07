import axios from 'axios'

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, 
  // baseURL: process.env.VUE_APP_BASE_API, 
  timeout: 5000 // request timeout
})

// 请求拦截器
axios.interceptors.request.use(
  config =>{
    console.log('请求拦截器')
    console.log(config)
    return config
  },
  error => {
    alert(error)
    return Promise.reject(error)
  }
)

// 相应拦截器
axios.interceptors.response.use(
  res =>{
    console.log('相应拦截器')
    console.log(res)
    return res
  },
  error => {
    alert(error)
    return Promise.reject(error)
  }
)

export default service