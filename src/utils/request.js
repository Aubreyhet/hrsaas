import axios from 'axios'
// 导入解构elementui的message组件
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 设置接口基准地址
  timeout: 5000 // 设置请求超时
})
service.interceptors.request.use()

// 响应拦截处理 数据解构与错误处理
service.interceptors.response.use(res => {
  const { success, data, message } = res.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, err => {
  Message.error(err.message)
  return Promise.reject(err)
})
export default service
