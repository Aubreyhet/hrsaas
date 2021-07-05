// 权限管理  或者导航守卫 路由守卫
// 引入路由
import router from '@/router'

// 引入vuex
import store from '@/store'

// 引入进度条模块和进度条样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 白名单
const whiteList = ['/login', '/404']

router.beforeEach(async(to, from, next) => {
  // 进度条开始
  nprogress.start()
  // 进行判断 是否有token
  if (store.getters.token) {
    // 如果有token 就再做下一步判断 是是否要去login页面
    if (to.path === '/login') {
      // 如过是去login页面 那就直接跳转到首页 不用再登录
      next('/')
    } else {
      // 如果是去其他页面 那就直接放行 然后再判断是否存在用户信息
      if (!store.getters.userId) {
        // 如果用户信息不存在 那就调用异步方法获取用户信息 然后放行
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 如果没有token 那就进行判断要去那个页面 根据白名单进行拦截
    if (whiteList.indexOf(to.path) > -1) {
      // 是要到白名单中的页面 直接放行
      next()
    } else {
      // 如果是去其他页面那就拦截然后重置到登录页面
      next('/login')
    }
  }
  nprogress.done()
})

router.afterEach(() => {
  nprogress.done()
})
