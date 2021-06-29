const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const autoIncrement = require("mongoose-auto-increment");

const userSchema = new mongoose.Schema(
  {
    // 用户id
    uid: {
      type: Number,
      require: true,
    },
    // 用户名
    username: {
      type: String,
      unique: true, //字段是否唯一
      required: true,
    },
    // 密码
    password: {
      type: String,
      set(val) {
        // 通过bcryptjs对密码加密返回值 第一个值返回值， 第二个密码强度
        return bcryptjs.hashSync(val, 10);
      },
      required: true,
    },
    // 邮箱
    email: {
      type: String,
      required: true,
    },
    // 头像
    avatar: {
      type: String,
      default:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    },
    // 角色
    role: {
      type: String,
      default: "0",
    },
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
