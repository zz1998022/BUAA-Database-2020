import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mId: 0,
    mName: "",
    mLink: "",
    rId: 0,
    rName: "",
    rGender: "",
    rIntro: "",
    gk:{ id: 0, name: "", type: "", price: "" },
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
    updateRoleId(state, inputId) {
      state.rId = inputId
    },
    updateRoleName(state, inputName) {
      state.rName = inputName
    },
    updateRoleGender(state, inputGender) {
      state.rGender = inputGender
    },
    updateRoleIntro(state, inputIntro) {
      state.rIntro = inputIntro
    },
    updateGKBy(state, payload) {
      console.log("index: ",payload.index);
      if(payload.index == '0'){
        state.gk.id = payload.inputGK;
      }else if(payload.index=='1'){
        state.gk.name = payload.inputGK;
      }else if(payload.index=='2'){
        state.gk.type = payload.inputGK;
      }else{
        console.log("else");
        state.gk.price = payload.inputGK;
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
