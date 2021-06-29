// 分类模型
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const categorySchema = new mongoose.Schema({
  // 分类id
  category_id: {
    type: Number,
    required: true,
  },
  // 分类名称
  category_name: {
    type: String,
    required: true,
  },
  // 分类路由
  category_router: {
    type: String,
  },
});
// 自增 ID 插件配置
autoIncrement.initialize(mongoose.connection);
categorySchema.plugin(autoIncrement.plugin, {
  model: "categorySchema",
  field: "category_id",
  startAt: 1,
  incrementBy: 1,
});
module.exports = mongoose.model("Category", categorySchema, "category");
