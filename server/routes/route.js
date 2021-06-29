const express = require("express");
const router = express.Router();
const Multer = require("multer");

const user = require("./user");
const menu = require("./menu");
const article = require("./article");
const category = require("./category");
const upload = require("./upload");

// 权限校验
const auth = require('../utils/auth');

// 用户相关路由
router.post("/user/login", user.login); // 登录
router.post("/user/register", user.register); // 注册
router.get("/user/userInfo", user.userInfo); // 查询用户信息
router.post("/user/emailCode", user.emailCode); // 获取邮件验证码

// 获取菜单
router.get("/menu", menu.menu);

// 文章相关接口
router.get("/article/recommendedList", article.recommendedList); // 获取热门文章
router.post("/article/publish", article.publish); // 发布文章

// 分类相关接口
router.get("/category/categoryList", category.categoryList); // 获取分类列表
router.post("/category/addCategory", auth, category.addCategory); // 添加分类列表(管理员才能请求)

// 上传文件
router.post(
  "/upload",
  Multer({ dest: "./uploads/" }).single("file"),
  upload.upload
);
// 导出路由模块
module.exports = router;
