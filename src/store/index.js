import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { 
    isMenuVisible: false,
    isLoading: false
  },
  getters: {
  },
  mutations: {
    toggleMenu(state, isVisible) {
      if (isVisible === undefined ) {
        state.isMenuVisible = !state.isMenuVisible;
      } else {
        state.isMenuVisible = isVisible
      }
    },
    setLoading(state, payload) {
      state.isLoading = payload
      console.log(state.isLoading, "lucas gay")
    }
  },
  actions: {
  },
  modules: {
  }
})
