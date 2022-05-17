const state = {
  badgeNumMap: {
  },
  badgeMax: 9
}
const mutations = {
  SET_DATA: (state, { name, value }) => {
    state.badgeNumMap[name] = value
  }
}
const actions = {
  GET_DATA({ commit }, data) {
  }
}

const getters = {
  badgeNumMap: state => state.badgeNumMap,
  badgeMax: state => state.badgeMax
}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
