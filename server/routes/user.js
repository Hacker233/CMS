const User = require("../database/models/user");
const jwt = require("jsonwebtoken");

const user = {
  login: async (req, res) => {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      return res.status(422).send({
        message: "用户不存在",
      });
    }
    const isPasswordValid = require("bcryptjs").compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(422).send({
        message: "密码无效",
      });
    }
    const token = jwt.sign(
      {
        id: String(user._id),
      },
      SECRET
    );
    // 生成token
    res.send({
      user,
      token,
    });
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
        // 增加一条数据
        user.save((err, doc) => {
          if (err) {
            res.json(res.setUnifyResFormat("", "D0001", err));
          } else {
            res.json(res.setUnifyResFormat(doc, "00000", "注册成功"));
          }
          return;
        });
      }
    );
  },
};
module.exports = user;
