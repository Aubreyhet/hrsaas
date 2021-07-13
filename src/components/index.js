// 负责全部全局组件的注册
// 引入组件
import PageTools from './Pagetools'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
  }
}
