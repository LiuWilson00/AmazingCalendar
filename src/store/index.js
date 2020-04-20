import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locale: ""
  },
  mutations: {
    SET_LOCALE(state, lang) {
      state.locale = lang
    }
  },
  actions: {
    GET_LANG_FROM_LOCAL(context) {
      let locale = localStorage.getItem('locale') || 'tw'
      context.commit("SET_LOCALE", locale)
    }
  },
  modules: {
  }
})
