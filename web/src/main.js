import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./theme/index.css"; // 主题
import "./assets/css/reset.css";
import "./common/auth"; // 权限检测
import LoginDialog from './common/LoginDialog'; // 登陆注册弹窗

Vue.config.productionTip = false;
Vue.prototype.$LoginDialog = LoginDialog;  

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
