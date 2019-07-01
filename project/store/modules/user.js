const state = {
  user: {
    userId: '',
    username: '',
    token: ''
  }
}

// getters
const getters = {
  cartProducts: (state, getters) => {
    return state.user
  }
}

// actions
const actions = {
  addUser({ state, commit }, user) {
    commit('addUser', user)
  },
  deleteUser({ state, commit }) {
    commit('deleteUser')
  }
}

// mutations
const mutations = {
  addUser(state, user) {
    state.user = user
  },
  deleteUser(state) {
    state.user = {
      userId: '',
      username: '',
      token: ''
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
