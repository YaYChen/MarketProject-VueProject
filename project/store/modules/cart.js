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
    const cartItem = state.items.find(item => item.id === product.id)
    if (!cartItem) {
      let item = {
        id: product.id,
        name: product.name,
        category: product.category.name,
        specification: product.specification,
        productPicture: product.productPicture,
        price: parseFloat(product.price),
        totalPrice: parseFloat(product.price),
        quantity: 1
      }
      commit('pushProductToCart', item)
    } else {
      commit('incrementItemQuantity', cartItem)
    }
  },

  addItemQuantity({ state, commit }, id) {
    const cartItem = state.items.find(item => item.id === id)
    commit('incrementItemQuantity', cartItem)
  },

  reduceItemQuantity({ state, commit }, id) {
    const cartItem = state.items.find(item => item.id === id)
    if (cartItem) {
      commit('disincrementItemQuantity', cartItem)
    }
  },

  clearCart({ commit, state }) {
    //emptycart
    commit('setCartItems', { items: [] })
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
  pushProductToCart(state, product) {
    state.items.push(product)
  },

  incrementItemQuantity(state, { id }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity++
    cartItem.totalPrice = cartItem.price * cartItem.quantity
  },

  disincrementItemQuantity(state, { id }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity--
    if (cartItem.quantity <= 0) {
      let index = state.items.indexOf(cartItem)
      state.items.splice(index, 1)
    } else {
      cartItem.totalPrice = cartItem.price * cartItem.quantity
    }
  },

  setCartItems(state, { items }) {
    state.items = items
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
