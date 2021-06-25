const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const codeSchema = new mongoose.Schema(
  {
    code_id: {
      type: Number,
      required: true,
    },
    e_mail: String,
    code: String,
  },
  { versionKey: false }
);
// 自增 ID 插件配置
autoIncrement.initialize(mongoose.connection);
codeSchema.plugin(autoIncrement.plugin, {
  model: "codeSchema",
  field: "code_id",
  startAt: 1,
  incrementBy: 1,
});
module.exports = mongoose.model("Code", codeSchema, "code");
