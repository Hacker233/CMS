const express = require('express');
const router = express.Router();
const user = require('./user');

// 登录、注册、注销
router.post('/user/login', user.login);
router.post('/user/register',user.register);


// 导出路由模块
module.exports = router;