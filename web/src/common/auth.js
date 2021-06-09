import router from "@/router/index";
import { Message } from "element-ui";
// 路由前置守卫
router.beforeEach((to, frmo, next) => {
  let token = localStorage.getItem("token");
  if (token || !to.meta.auth) {
    next();
  } else {
    Message.error("游客暂时无法访问哦！");
  }
});
