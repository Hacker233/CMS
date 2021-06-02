const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const menuSchema = new mongoose.Schema(
  {
    menu_id: {
      type: Number,
      required: true,
    },
    name: String,
    route: String,
    children: [
      {
        name: String,
        route: String,
      },
    ],
  },
  { versionKey: false }
);
// 自增 ID 插件配置
autoIncrement.initialize(mongoose.connection);
menuSchema.plugin(autoIncrement.plugin, {
  model: "menuSchema",
  field: "menu_id",
  startAt: 1,
  incrementBy: 1,
});
module.exports = mongoose.model("Menu", menuSchema, "menu");
