const express = require("express");
const router = express.Router();
const user = require("./user");
const menu = require("./menu");
const recommended = require("./recommended");

// 用户相关路由
router.post("/user/login", user.login);
router.post("/user/register", user.register);
router.get("/user/userInfo", user.userInfo);

// 获取菜单
router.get("/menu", menu.menu);

// 获取推荐列表
router.get("/recommended/recommendedList", recommended.recommendedList)

// 导出路由模块
module.exports = router;
