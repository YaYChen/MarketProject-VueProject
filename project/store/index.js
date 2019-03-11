import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart.js'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    modules: {
      cart
    }
  })
}

export default createStore
