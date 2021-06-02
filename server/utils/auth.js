const User = require("../database/models/user");
const tokenConfig = require("../config/index");
const jwt = require("jsonwebtoken");

const tokenSetAndVer = {
  // 生成token
  setToken: (username) => {
    return new Promise((resolve, reject) => {
      const token = jwt.sign(
        {
          name: username,
        },
        tokenConfig.SCRECT,
        { expiresIn: "24h" }
      );
      resolve(token);
    });
  },
  // 校验token
  verToken: (token) => {
    return new Promise((resolve, reject) => {
      if (!token) {
        console.log("token是空的");
        reject({
          error: "token 是空的",
        });
      } else {
        //第二种  改版后的
        var info = jwt.verify(token.split(" ")[1], jwtScrect);
        resolve(info); //解析返回的值（sign 传入的值）
      }
    });
  },
};
module.exports = tokenSetAndVer;
