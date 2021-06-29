const Category = require("../database/models/category");
const category = {
  // 获取分类列表
  categoryList: (req, res) => {
    Category.find({}, { _id: 0 }, (err, doc) => {
      if (!err) {
        res.json(res.setUnifyResFormat(doc, "00000", "查询成功"));
      } else {
        res.json(res.setUnifyResFormat(err, "M0001", "导航菜单查询失败！"));
      }
    }).sort({ category_id: 1 });
  },
  // 添加分类
  addCategory: async (req, res) => {
    const category_name = req.body.categoryName;
    const category_router = req.body.categoryRouter;
    // 查询分类是否存在
    const categoryName = await Category.findOne({
      category_name,
    });
    if (categoryName) {
      res.json(res.setUnifyResFormat(null, "C0001", "分类名称已存在"));
      return;
    }
    // 查询分类路由是否存在
    const categoryRouter = await Category.findOne({
      category_router,
    });
    if (categoryRouter) {
      res.json(res.setUnifyResFormat(null, "C0002", "分类路由已存在"));
      return;
    }
    const categoryInsert = new Category({
      category_name,
      category_router,
    });
    categoryInsert.save((err, doc) => {
      if (err) {
        res.json(res.setUnifyResFormat(err, "C0003", "添加分类失败"));
      } else {
        res.json(res.setUnifyResFormat(doc, "00000", "添加分类成功"));
      }
    });
  },
};
module.exports = category;
