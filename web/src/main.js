import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./theme/index.css"; // 主题
import "./assets/css/reset.css";
import "./common/auth"; // 权限检测
import "./assets/css/common.less"; // 公共css
import login from "./common/LoginDialog"; // 登录弹窗全局组件
// import "@/assets/iconfont/iconfont.js";
import IconPig from "./components/IconSvg/IconPig.vue";
import moment from "moment"; // 日期处理插件
import MessageTree from "message-tree"; // 评论列表组件树
import CommentEditor from "comment-message-editor"; // 评论组件编辑框
import Comments from 'vue-comments'

Vue.use(Comments)
Vue.use(MessageTree);


Vue.prototype.$moment = moment;
Vue.component("IconPig", IconPig);
Vue.component(CommentEditor.name, CommentEditor);
Vue.prototype.$login = login.install;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
