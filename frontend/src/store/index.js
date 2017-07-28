import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as states from './states'
import * as mutations from './mutations'
import tests from './modules/testmodules'

Vue.use(Vuex)

//I don't know what this can do,maybe use for debug I guess
//this come from document from offcial web of vue
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  states,
  actions,
  getters,
  mutations,
  modules: {
    tests,
  },
  strict: debug
})
