const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors"); // 跨域處理
const bodyParser = require("body-parser"); // 处理post请求中间件
const mongodbConnect = require("./database/connect"); // 数据库连接文件
const router = require("./routes/route"); // 引入router模块
const resextra = require("./utils/unifyResFormat"); // 格式化返回数据
const tokenSetAndVer = require("./utils/auth"); // 校验token
const expressJWT = require("express-jwt"); // 校验token过期时间以及不需要token检测的路由
const tokenConfig = require("./config/index");
const app = express();

app.use(
  cors({
    exposeHeaders: ["Authorization"],
  })
); // 解決跨域
// 处理post请求
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// 格式化返回数据格式
app.use(resextra);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 解析token获取用户信息
app.use((req, res, next) => {
  // 让前端在axios中可以获取Authorization
  res.header("Access-Control-Expose-Headers", "Authorization");
  let token = req.headers["authorization"];
  if (!token) {
    return next();
  } else {
    tokenSetAndVer
      .verToken(token)
      .then((data) => {
        req.data = data;
        return next();
      })
      .catch((error) => {
        return next();
      });
  }
});

//验证token是否过期并规定哪些路由不用验证
app.use(
  expressJWT({
    secret: tokenConfig.SCRECT,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/user/login",
      "/user/register",
      "/menu",
      "/recommended/recommendedList",
      "/upload"
    ], // 无需验证token
  })
);

// 连接数据库
mongodbConnect();
// 初始化所有路由
app.use(router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  if (err.name === "UnauthorizedError") {
    res.status(200);
    res.json(res.setUnifyResFormat("", "T0001", "token验证失败"));
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
