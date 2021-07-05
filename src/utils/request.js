import axios from 'axios'
// 导入解构elementui的message组件
import { Message } from 'element-ui'
// 导入vuex
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 设置接口基准地址
  timeout: 5000 // 设置请求超时
})

// 请求拦截器
service.interceptors.request.use(config => {
  // config 配置必须要返回 注入token
  if (store.getters.token) {
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

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
