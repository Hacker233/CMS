import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./theme/index.css"; // 主题
import "./assets/css/reset.css";
import "./common/auth"; // 权限检测
import login from "./common/LoginDialog"; // 登录弹窗全局组件
// import "@/assets/iconfont/iconfont.js";
import IconPig from './components/IconSvg/IconPig.vue';

Vue.component('IconPig',IconPig);
Vue.prototype.$login = login.install;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
