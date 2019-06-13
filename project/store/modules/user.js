const state = {
  token:'',
  user:{}
}

// actions
const actions = {
  addUser({ state, commit }, user) {
    commit('addUserID',user)
  },

  addToken({ state, commit }, token) {
    commit('addToken', token)
  }
}

// mutations
const mutations = {
  addUser(state, user) {
    state.userID = user
  },

  addToken(state, token) {
    state.token = token
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}