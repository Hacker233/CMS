const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const { DB_URL } = require("./constant");
// 连接数据库
module.exports = () => {
  mongoose.connect(
    DB_URL,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("数据库连接成功");
      }
    }
  );
  autoIncrement.initialize(mongoose.connection);
};
