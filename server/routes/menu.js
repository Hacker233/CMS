const Menu = require("../database/models/menu");

const menu = {
  menu: (req, res) => {
    Menu.find({},{_id:0},
      (err, doc) => {
        if (!err) {
          res.json(res.setUnifyResFormat(doc, "00000", "查询成功"));
        } else {
          res.json(res.setUnifyResFormat(err, "M0001", "导航菜单查询失败！"));
        }
      },
    ).sort({'menu_id':1});
  },
};
module.exports = menu;
