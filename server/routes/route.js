const express = require("express");
const router = express.Router();
const user = require("./user");
const menu = require("./menu");

// 登录、注册、注销
router.post("/user/login", user.login);
router.post("/user/register", user.register);

// 获取菜单
router.get("/menu", menu.menu);

// 导出路由模块
module.exports = router;
