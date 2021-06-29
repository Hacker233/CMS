const auth = async (req, res, next) => {
  // 普通用户
  if (req.user.role === "0") {
    res.json(res.setUnifyResFormat(null, "U0005", "用户权限不足"));
  } else {
    next();
  }
};
module.exports = auth;
