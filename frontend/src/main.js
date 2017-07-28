// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import  VueResource  from 'vue-resource'

Vue.use(VueResource) 
Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
   state: {
    count: 0
  },
  getters: {
    getCount: (state) => {
      return state.count
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
  	increment_a (context) {
  	  context.commit('increment')
  	}
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  http: {
    root: '/root',
    headers: {
      Authorization: 'Basic YXBpOnBhc3N3b3Jk'
    }
  }

})
