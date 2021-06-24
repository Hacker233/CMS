const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const articleScheam = new mongoose.Schema({
  // 文章id
  article_id: {
    type: Number,
    required: true,
  },
  // 文章标题
  title: {
    type: String,
  },
  // 文章分类
  category: {
    type: String,
  },
  // 文章类型
  type: {
    type: String,
  },
  //  文章内容
  content: {
    type: String,
  },
  // 封面图
  cover: {
    type: String,
  },
  // 浏览量
  views: {
    type: Number,
    default: 0,
  },
  // 点赞量
  likes: {
    type: Number,
    default: 0,
  },
  // 评论量
  comments: {
    type: Number,
    default: 0,
  },
  // 收藏量
  collections: {
    type: Number,
    default: 0,
  },
  // 用户信息
  userInfo: {
    type: Object,
  },
  // 文章排名
  rank: {
    type: Number,
  },
});
// 自增 ID 插件配置
autoIncrement.initialize(mongoose.connection);
articleScheam.plugin(autoIncrement.plugin, {
  model: "articleScheam",
  field: "article_id",
  startAt: 1,
  incrementBy: 1,
});
module.exports = mongoose.model("Article", articleScheam, "article");
