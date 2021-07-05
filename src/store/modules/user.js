// 导入本地存储操作模块
import { getToken, setToken, removeToken } from '@/utils/auth'

// 导入登录接口
import { login } from '@/api/user'

/**
 * 用户模块的vuex
 */
const state = {
  token: getToken
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  }
}
const actions = {
  // 调用登录接口 异步操作token
  async login(context, data) {
    const res = await login(data) // 拿到token
    context.commit('setToken', res) // 设置token
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
