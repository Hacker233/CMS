module.exports = (app) => {
  const nodemailer = require("nodemailer");
  const smtpTransport = require("nodemailer-smtp-transport");

  const assert = require("http-assert");

  const transport = nodemailer.createTransport(
    smtpTransport({
      host: "smtp.163.com", // 服务
      port: 465, // smtp端口
      secure: true,
      auth: {
        user: "crackerlink@163.com", //用户名
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

  return async (req, res, next) => {
    let EMAIL = req.body.e_mail;
    if (regEmail.test(EMAIL)) {
      let code = randomFns();
      transport.sendMail(
        {
          from: "crackerlink@163.com", // 发件邮箱
          to: EMAIL, // 收件列表
          subject: "验证你的电子邮件", // 标题
          html: `
            <p>你好！</p>
            <p>您正在注册Cracker社区账号</p>
            <p>你的验证码是：<strong style="color: #ff4e2a;">${code}</strong></p>
            <p>***该验证码5分钟内有效***</p>`, // html 内容
        },
        function (error, data) {
          assert(!error, 500, "发送验证码错误！");
          transport.close(); // 如果没用，关闭连接池
        }
      );
      const Code = require("../models/Code");
      const e_mail = EMAIL;
      await Code.deleteMany({ e_mail });
      const [data] = await Code.insertMany({ e_mail, veri_code: code });
      setTimeout(async () => {
        //5分钟后失效
        await Code.deleteMany({ e_mail });
      }, 1000 * 60 * 5);
    } else {
      assert(false, 422, "请输入正确的邮箱格式！");
    }
    next();
  };
};
