import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const Index = () => import("@/views/index/index.vue"); // 首页
const ArticleDetails = () => import("@/views/articleDetails/index.vue"); // 文章详情页

const routes = [
  // 首页
  {
    path: "/",
    name: "index",
    meta: {
      auth: false, // 是否需要token验证
    },
    component: Index,
  },
  // 文章详情页
  {
    path: "/articleDetails",
    name: "articleDetails",
    meta: {
      auth: false,
    },
    component: ArticleDetails, // 文章详情页
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
