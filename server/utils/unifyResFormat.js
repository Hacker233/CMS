const setUnifyResFormat = (req, res, next) => {
  res.setUnifyResFormat = (data, code, message) => {
    let res = {
      data,
      code: code,
      message,
    };
    return res;
  };
  next();
};

module.exports = setUnifyResFormat; // 格式化返回数据
