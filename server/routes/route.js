const express = require('express');
const router = express.Router();
const user = require('./login');

// 登录、注册、注销
router.post('/login', user.login);


// 导出路由模块
module.exports = router;