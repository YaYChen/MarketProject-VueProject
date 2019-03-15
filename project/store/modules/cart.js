const state = {
  items: [],
  totalNumber: 0,
  totalPrice: 0
}

// getters
const getters = {
  cartProducts: (state, getters) => {
    return state.items
  }
}

// actions
const actions = {
  addProductToCart({ state, commit }, product) {
    const cartItem = state.items.find(item => item.product.id === product.id)
    if (!cartItem) {
      let item = {
        product: product,
        quantity: 1,
        totalPrice: parseFloat(product.price)
      }
      commit('pushProductToCart', item)
    } else {
      commit('incrementItemQuantity', cartItem.product)
    }
  },

  addItemQuantity({ state, commit }, id) {
    const cartItem = state.items.find(item => item.product.id === id)
    commit('incrementItemQuantity', cartItem.product)
  },

  reduceItemQuantity({ state, commit }, id) {
    const cartItem = state.items.find(item => item.product.id === id)
    if (cartItem) {
      commit('disincrementItemQuantity', cartItem.product)
    }
  },

  clearCart({ commit, state }) {
    //emptycart
    commit('setCartItems')
  },

  getTotalPrice({ commit, state }) {
    commit('countTotalPrice')
  },

  getTotalNumber({ commit, state }) {
    commit('countTotalNumber')
  }
}

// mutations
const mutations = {
  pushProductToCart(state, item) {
    state.items.push(item)
  },

  incrementItemQuantity(state, { id }) {
    const cartItem = state.items.find(item => item.product.id === id)
    cartItem.quantity++
    cartItem.totalPrice = cartItem.product.price * cartItem.quantity
  },

  disincrementItemQuantity(state, { id }) {
    const cartItem = state.items.find(item => item.product.id === id)
    cartItem.quantity--
    if (cartItem.quantity <= 0) {
      let index = state.items.indexOf(cartItem)
      state.items.splice(index, 1)
    } else {
      cartItem.totalPrice = cartItem.product.price * cartItem.quantity
    }
  },

  setCartItems(state) {
    state.items = []
    state.totalNumber = 0
    state.totalPrice = 0
  },

  countTotalPrice(state) {
    state.totalPrice = 0
    state.items.forEach(element => {
      state.totalPrice = state.totalPrice + element.totalPrice
    })
  },

  countTotalNumber(state) {
    state.totalNumber = 0
    state.items.forEach(element => {
      state.totalNumber = state.totalNumber + element.quantity
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
