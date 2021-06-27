const User = require("../database/models/user"); // 模型
const Code = require("../database/models/code");
const tokenSetAndVer = require("../utils/auth"); // 设置token和校验token
const bcryptjs = require("bcryptjs"); // 密码加密

// 邮件发送模块
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

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
    const e_mail = req.body.email;
    const code = req.body.code;
    const password = req.body.password;
    // 检验验证码
    const vire = await Code.findOne({ e_mail, code });
    if (!vire) {
      res.json(res.setUnifyResFormat(null, "U0001", "验证码填写错误!"));
      return;
    }

    // 检验用户信息
    User.findOne(
      {
        email: e_mail,
      },
      (err, doc) => {
        if (doc) {
          res.json(res.setUnifyResFormat("", "U0001", "邮件已被注册了!"));
          return;
        }
        // 保存用户注册的信息到数据中
        let user = new User({
          username: username,
          password: password,
          email: e_mail,
        });
        // 保存用户
        user.save(async (err, doc) => {
          if (err) {
            res.json(res.setUnifyResFormat("", "D0001", err));
          } else {
            Code.deleteMany({ e_mail }); // 删除验证码
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

  // 获取邮箱验证码
  emailCode: async (req, res) => {
    const transport = nodemailer.createTransport(
      smtpTransport({
        host: "smtp.163.com", // 服务
        port: 465, // smtp端口
        secure: true,
        auth: {
          user: "lhqhacker@163.com", //用户名
          pass: "FOFMEMXOOXULIQRM", // SMTP授权码
        },
      })
    );
    const randomFns = () => {
      // 生成6位随机数
      let code = "";
      for (let i = 0; i < 6; i++) {
        code += parseInt(Math.random() * 10);
      }
      return code;
    };
    const regEmail =
      /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; //验证邮箱正则

    let EMAIL = req.body.email;
    if (regEmail.test(EMAIL)) {
      let code = randomFns();
      transport.sendMail(
        {
          from: "lhqhacker@163.com", // 发件邮箱
          to: EMAIL, // 收件列表
          subject: "验证你的电子邮件", // 标题
          html: `
            <p>你好！</p>
            <p>您正在注册小猪社区账号</p>
            <p>你的验证码是：<strong style="color: #ff4e2a;">${code}</strong></p>
            <p>***该验证码10分钟内有效***</p>`, // html 内容
        },
        function (error, data) {
          if (error) {
            transport.close(); // 如果没用，关闭连接池
          }
        }
      );
      const e_mail = EMAIL;
      await Code.deleteMany({ e_mail });
      const [data] = await Code.insertMany({ e_mail, code: code });
      setTimeout(async () => {
        //10分钟后失效
        await Code.deleteMany({ e_mail });
      }, 1000 * 60 * 10);
      res.json(res.setUnifyResFormat(null, "00000", "邮件发送成功"));
    } else {
      res.json(res.setUnifyResFormat(null, "E0001", "邮件格式错误"));
    }
  },
};
module.exports = user;
