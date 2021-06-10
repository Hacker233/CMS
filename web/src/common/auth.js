import router from "@/router/index";
import { Message } from "element-ui";
// 路由前置守卫
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if (token || !to.meta.auth) {
    next();
  } else {
    if (to.path !== "/") {
      next("/");
    }
    Message.error("游客暂时无法访问哦！");
  }
});
