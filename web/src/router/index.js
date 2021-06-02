import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const Index = () => import("@/views/index/index.vue"); // 首页
const Login = () => import("@/views/login/login.vue"); // 登录页

const routes = [
  {
    path: "/",
    name: "index",
    meta: {
      auth: false, // 是否需要token验证
    },
    component: Index,
  },
  {
    path: "/login",
    name: "login",
    meta: {
      auth: false, // 是否需要token验证
    },
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
