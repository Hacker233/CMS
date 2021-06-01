const mongoose = require("mongoose");
const user = require("../../routes/user");
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true, //字段是否唯一
    required: true,
  },
  password: {
    type: String,
    set(val){
        // 通过bcryptjs对密码加密返回值 第一个值返回值， 第二个密码强度
        return bcryptjs.hashSync(val,10)
    },
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema, "user");
