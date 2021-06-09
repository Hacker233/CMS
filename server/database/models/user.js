const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const autoIncrement = require("mongoose-auto-increment");

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: Number,
      require: true,
    },
    username: {
      type: String,
      unique: true, //字段是否唯一
      required: true,
    },
    password: {
      type: String,
      set(val) {
        // 通过bcryptjs对密码加密返回值 第一个值返回值， 第二个密码强度
        return bcryptjs.hashSync(val, 10);
      },
      required: true,
    },
    email: {
      type: String
    },
    avatar: {
      type: String,
      default: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    }
  },
  { versionKey: false }
);
// 自增 ID 插件配置
autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, {
  model: "userSchema",
  field: "uid",
  startAt: 1,
  incrementBy: 1,
});
module.exports = mongoose.model("User", userSchema, "user");
