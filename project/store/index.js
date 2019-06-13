import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart.js'
import user from './modules/user.js'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    modules: {
      cart,
      user
    }
  })
}

export default createStore
