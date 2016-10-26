// vue的应用当然要引，等下要用它来注册
import Vue from 'vue'
// 这个是路由，spa应用必要哦
import VueRouter from 'vue-router'
// 这个是类似ajax请求,肯定要拉去数据啦，所以也下载吧
import VueResource from 'vue-resource'
import routerConfig from './router'
import pullToRefresh from './directives/pullToRefresh'
import infiniteScroll from './directives/infiniteScroll'
import * as filters from './filters'
import app from './main'

// Router
Vue.use(VueRouter)

const router = new VueRouter({
  // 当hashbang的值为true时，所有的路径都会被格式化已#!开头
  hashbang: true,
  history: true,
  saveScrollPosition: true,
  suppressTransitionError: true
})

routerConfig(router)

// Resource
Vue.use(VueResource)

Vue.http.options.root = process.env.NODE_ENV === 'development' ? 'src/assets/data' : '/vue-sui-demo/static/data'
Vue.http.options.emulateJSON = true

// Directive
Vue.directive('pullToRefresh', pullToRefresh)
Vue.directive('infiniteScroll', infiniteScroll)

// Filters
Vue.filter('date', filters.dateFilter)

router.start(app, '#app')

window.router = router
