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
