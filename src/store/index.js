import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    updateId:0,
    updateName:"",
    updateLink:"",
  },
  mutations: {
    updateItemId(state, inputId){
      state.updateId = inputId
    },
    updateItemName(state, inputName){
      state.updateName = inputName
    },
    updateItemLink(state, inputLink){
      state.updateLink = inputLink
    }
  },
  actions: {
  },
  modules: {
  }
})
