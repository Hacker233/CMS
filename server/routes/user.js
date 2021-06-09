const User = require("../database/models/user"); // 模型
const tokenSetAndVer = require("../utils/auth"); // 设置token和校验token
const bcryptjs = require("bcryptjs");

const user = {
  // 登录
  login: async (req, res) => {
    // 查询是否有此用户
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      res.json(res.setUnifyResFormat("", "U0002", "用户名不存在!"));
      return;
    } else {
      // 验证密码是否正确
      const isPasswordValid = await bcryptjs.compareSync(
        req.body.password,
        user.password
      );
      if (!isPasswordValid) {
        res.json(res.setUnifyResFormat("", "U0003", "密码错误!"));
        return;
      }
    }
    // 生成token
    const token = await tokenSetAndVer.setToken(user.uid);
    res.setHeader("Authorization", "Bearer " + token);
    // 返回
    res.json(res.setUnifyResFormat(null, "00000", "登录成功！"));
  },
  // 注册
  register: async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // 查询数据库
    User.findOne(
      {
        username: username,
      },
      (err, doc) => {
        if (doc) {
          res.json(res.setUnifyResFormat("", "U0001", "用户名已经被注册了!"));
          return;
        }
        // 保存用户注册的信息到数据中
        let user = new User({
          username: username,
          password: password,
        });
        // 保存用户
        user.save(async (err, doc) => {
          if (err) {
            res.json(res.setUnifyResFormat("", "D0001", err));
          } else {
            // 生成token
            const token = await tokenSetAndVer.setToken(user.uid);
            res.setHeader("Authorization", "Bearer " + token);
            res.json(res.setUnifyResFormat(doc, "00000", "注册成功"));
          }
          return;
        });
      }
    );
  },

  // 查询用户信息
  userInfo: async (req, res) => {
    let uid = req.data.uid;
    User.findOne({ uid: uid }, (err, doc) => {
      if (doc) {
        res.json(res.setUnifyResFormat(doc, "00000", "用户信息查询成功！"));
      } else {
        res.json(res.setUnifyResFormat(err, "U0004", "用户信息查询失败！"));
      }
    });
  },
};
module.exports = user;
