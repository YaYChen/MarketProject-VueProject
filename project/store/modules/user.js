const state = {
  userInfo: null
}

// getters
const getters = {}

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
    state.userInfo = user
  },
  deleteUser(state) {
    state.userInfo = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
