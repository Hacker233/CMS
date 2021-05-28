const express = require('express');
const route = express.Router();

const user = require('./user');
module.exports = () => {
  // 用户模块
  route.get('/login',user.login);
}