import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // token
    token: localStorage.getItem("token")
      ? localStorage.getItem("token")
      : false,
    // 用户信息
    userInfo: '',
  },
  getters: {
    token: (state) => state.token,
    getUserInfo: (state) => state.userInfo,
  },
  mutations: {
    // 修改token，并将token存入本地
    setAuthorization(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    // 获取用户信息后存储下来
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
  },
  actions: {},
  modules: {},
});
