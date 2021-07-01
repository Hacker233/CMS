const Article = require("../database/models/article");
const User = require("../database/models/user"); // 模型

const moment = require("moment"); // 日期处理

const article = {
  // 获取推荐列表
  recommendedList: async (req, res) => {
    let responseList = []; // 推荐列表
    // 推荐的文章
    let articleObj = {};
    const topArticleList = await Article.find({}, { _id: 0 })
      .sort({ rank: 1 })
      .limit(10);
    if (topArticleList) {
      articleObj.title = "热门文章";
      articleObj.flag = "1";
      articleObj.topArticleList = topArticleList.map((item) => {
        item.content.replace(/<[a-zA-Z]+.*?>/g, "");
        return item;
      });
      responseList.push(articleObj);
    } else {
      res.json(res.setUnifyResFormat(null, "A0001", "热门文章查询失败!"));
    }
    res.json(res.setUnifyResFormat(responseList, "00000", "查询成功"));
  },
  // 发布文章
  publish: async (req, res) => {
    let uid = req.user.uid;
    const user = await User.findOne({
      uid: uid,
    });
    if (!user) {
      res.json(res.setUnifyResFormat("", "U0002", "用户名不存在!"));
      return;
    }
    let insertData = {
      title: req.body.title,
      category: req.body.category,
      content: req.body.content,
      uid: uid,
      userInfo: {
        avatar: user.avatar,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      createTime: moment().format("YYYY-MM-DD HH:mm:ss"),
      cover: req.body.cover,
      types: req.body.types,
    };
    let article = new Article(insertData);
    article.save((err, doc) => {
      if (err) {
        res.json(res.setUnifyResFormat(err, "A0002", "发布文章失败"));
      } else {
        res.json(res.setUnifyResFormat(doc, "00000", "发布成功"));
      }
    });
  },
  // 获取文章详情
  articleInfo: async (req, res) => {
    let article_id = req.query.article_id;
    const article = await Article.findOne({
      article_id
    })
    if (!article) {
      res.json(res.setUnifyResFormat(null, "A0003", "文章查询失败"));
    } else {
      res.json(res.setUnifyResFormat(article, "00000", "查询成功"));
    }
  },
};
module.exports = article;
