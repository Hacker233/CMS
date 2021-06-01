const User = require("../database/models/user");
const signkey = "ewgfvwergvwsgw5454gsrgvsvsd";
const jwt = require("jsonwebtoken");

const tokenSetAndVer = {
  // 生成token
  setToken: (username) => {
    return new Promise((resolve, reject) => {
      const token = jwt.sign(
        {
          name: username
        },
        signkey,
        { expiresIn: "24h" }
      );
      resolve(token);
    });
  },
  // 校验token
  verToken: (token) => {
    return new Promise((resolve, reject) => {
      let info = jwt.verify(token.split(" ")[1], signkey);
      resolve(info);
    });
  },
};
module.exports = tokenSetAndVer;
