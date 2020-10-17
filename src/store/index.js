import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mId: 0,
    mName: "",
    mLink: "",
  },
  mutations: {
    updateItemId(state, inputId) {
      state.mId = inputId
    },
    updateItemName(state, inputName) {
      state.mName = inputName
    },
    updateItemLink(state, inputLink) {
      state.mLink = inputLink
    },
  },
  actions: {
  },
  modules: {
  }
})
