// 导入本地存储操作模块
import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'

// 导入登录接口
import { login, getUserInfo, getUserAllInfo } from '@/api/user'

import { resetRouter } from '@/router'

/**
 * 用户模块的vuex
 */
const state = {
  // token
  token: getToken(),
  // 用户资料信息 定义空对象
  userInfo: {} // 不能将数据设置为null 没有数据的情况下避免报错
}
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  // 删除token
  removeToken(state) {
    state.token = null
    removeToken()
  },
  // 设置用户信息
  setUserInfo(state, res) {
    state.userInfo = { ...res } // 使用浅拷贝的方式将数据传给userinfo
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  // 调用登录接口 异步操作token
  async login(context, data) {
    const res = await login(data) // 拿到token
    context.commit('setToken', res) // 设置token
    setTimeStamp()
  },
  // 调用获取用户信息接口 异步操作
  async getUserInfo(context) {
    // 调用接口
    const res = await getUserInfo()
    // 调用另外一个接口 获取用户所有信息
    const allInfo = await getUserAllInfo(res.userId)
    // 使用扩展运算将两个对象进行合并
    const obj = { ...allInfo, ...res }
    context.commit('setUserInfo', obj)
    return obj // 将res返回出去？ 为什么？ 做权限
  },
  // 登出logout 方法
  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
    // 重置路由 两条线
    // 路由表重置
    resetRouter()
    // vuex中重置 调用了兄弟模块中moutations中的方法进行重置
    context.commit('permission/setRouter', [], { root: true })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
