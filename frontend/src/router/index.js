//这个文件是路由,主要是用于当后端返回数据时候改变页面url以及页面内的组件用的

import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Signup from '@/components/Signup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
    	path: '/signup',
    	name: 'signup',
    	component: Signup,
    }
  ]
})
