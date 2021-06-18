import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const Index = () => import("@/views/index/index.vue"); // 首页
const Category = () => import("@/views/category/index.vue"); // 分类页
const ArticleDetails = () => import("@/views/articleDetails/index.vue"); // 文章详情页
const PersonalCenter = () => import("@/views/personalCenter/index.vue"); // 个人中心
const Write = () => import("@/views/write/index.vue"); // 发布页面

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
  {
    path: "/category",
    name: "category",
    meta: {
      auth: false,
    },
    component: Category, // 分类页面
  },
  // 发布页面
  {
    path: "/write",
    name: "write",
    meta: {
      auth: true,
    },
    component: Write, // 发布页面
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
  // 个人中心
  {
    path: "/personalCenter",
    name: "personalCenter",
    meta: {
      auth: true,
    },
    component: PersonalCenter,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
export default router;
