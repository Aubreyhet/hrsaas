import axios from 'axios'
// 导入解构elementui的message组件
import { Message } from 'element-ui'
// 导入vuex
import store from '@/store'
// 导入超时时间操作模块方法
import { getTimeStamp } from '@/utils/auth'
import router from '@/router'
// 设置token 超时时间基准为2小时
const tokenTimeout = 7200 // 当前超时时间为2小时

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 设置接口基准地址
  timeout: 5000 // 设置请求超时
})

// 请求拦截器
service.interceptors.request.use(config => {
  // config 配置必须要返回 注入token
  // 在注入token前检查是否超时 如果超时就删除掉token 同时将页面做退出操作
  if (store.getters.token) {
    if (isTimeout()) {
      // 登出操作 路由跳转
      store.dispatch('user/logout')
      router.push('/login')
      // 抛出错误提示
      return Promise.reject(new Error('Token过期，请重新登录'))
    }
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
  // 被动判断token是否过期 由后端提供
  if (err.response && err.response.data && err.response.data.code === 10002) {
    // token超时， 做退出操作 删除token
    store.dispatch('user/logout')
    router.push('/login')
  } else {
    Message.error(err.message)
  }
  return Promise.reject(err)
})

// 定义一个时间超时的方法
function isTimeout() {
  // 定义当前时间戳
  const nowTime = Date.now()
  // 获取存入token时的时间戳
  const oldTime = getTimeStamp()
  // 需要当前的时间减去当时登录时存入的时间戳是否大于设置的超时时长
  return (nowTime - oldTime) / 1000 > tokenTimeout
}
export default service
