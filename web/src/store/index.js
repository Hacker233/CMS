import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token")
      ? localStorage.getItem("token")
      : false,
  },
  getters: {
    token: (state) => state.token,
  },
  mutations: {
    // 修改token，并将token存入本地
    setAuthorization(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
  },
  actions: {},
  modules: {},
});
