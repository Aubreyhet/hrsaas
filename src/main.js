import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

// 引入全局自定义组件
import Components from '@/components'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import i18n from '@/lang'

import './icons' // icon
import './permission' // permission control 权限拦截
// 加载自定义指令模块
import * as directive from '@/directive'

import * as filters from './filters' // global filters

// 自定义指定注册
Object.keys(directive).forEach(key => {
  Vue.directive(key, directive[key])
})

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
})

// 注册全局自定义组件
Vue.use(Components)

// 设置element为当前的语言
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
