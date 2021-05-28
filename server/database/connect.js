const mongoose = require('mongoose');
const {
    DB_URL
} = require('./constant');
// 连接数据库
module.exports = () => {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('数据库连接成功');
        }
    })
}