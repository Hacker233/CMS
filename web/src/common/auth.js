import router from "@/router/index";
// 路由前置守卫
router.beforeEach((to, frmo, next) => {
  let token = localStorage.getItem("token");
  if (token || !to.meta.auth) {
    next();
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next("/login");
    }
  }
});
