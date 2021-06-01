module.exports = (req, res, next) => {
  res.setUnifyResFormat = (data, code, message) => {
    let res = {
      data,
      status: code,
      message,
    };
    return res;
  };
  next();
};
