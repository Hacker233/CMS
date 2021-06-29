const tokenConfig = require("../config/index");
const jwt = require("jsonwebtoken");

const tokenSetAndVer = {
  // 生成token
  setToken: (uid, role) => {
    return new Promise((resolve, reject) => {
      const token = jwt.sign(
        {
          uid: uid,
          role: role,
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
        let info = jwt.verify(token.split(" ")[1], tokenConfig.SCRECT);
        resolve(info); //解析返回的值（sign 传入的值）
      }
    });
  },
};
module.exports = tokenSetAndVer;
