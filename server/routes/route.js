const express = require("express");
const router = express.Router();
const Multer = require("multer");

const user = require("./user");
const menu = require("./menu");
const recommended = require("./recommended");
const upload = require("./upload");

// 用户相关路由
router.post("/user/login", user.login);
router.post("/user/register", user.register);
router.get("/user/userInfo", user.userInfo);
router.post("/user/emailCode", user.emailCode);

// 获取菜单
router.get("/menu", menu.menu);

// 获取推荐列表
router.get("/recommended/recommendedList", recommended.recommendedList);

// 上传文件
router.post(
  "/upload",
  Multer({ dest: "./uploads/" }).single("file"),
  upload.upload
);
// 导出路由模块
module.exports = router;
