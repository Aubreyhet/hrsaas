// 引入路由模块
import { constantRoutes, asyncRoutes } from '@/router/index'

const state = {
  router: constantRoutes
}
const mutations = {
  setRouter(state, newRouter) {
    state.router = [...constantRoutes, ...newRouter]
  }
}
const actions = {
  filterRouter(context, menus) {
    // 定义一个最终要装用户的动态路由对象
    const resAsycnRouter = []
    // 遍历获取过来的用户路由数组 从全部的动态路由中筛选出来交给mutations 添加到state 的router中
    menus.forEach(key => {
      resAsycnRouter.push(...asyncRoutes.filter(item => item.name === key))
    })
    context.commit('setRouter', resAsycnRouter)
    return resAsycnRouter
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
