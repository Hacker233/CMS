const Article = require("../database/models/article");
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
      articleObj.topArticleList = topArticleList;
      responseList.push(articleObj);
    } else {
      res.json(res.setUnifyResFormat(null, "A0001", "热门文章查询失败!"));
    }
    res.json(res.setUnifyResFormat(responseList, "00000", "查询成功"));
  },
};
module.exports = article;
