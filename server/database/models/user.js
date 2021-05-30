const mongoose = require('mongoose');
const user = require('../../routes/login');
const autoIncrement = require('mongoose-auto-increment');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
// 自增 ID 插件配置
userSchema.plugin(autoIncrement.plugin, {
	model: 'User',
	field: 'id',
	startAt: 1,
	incrementBy: 1,
});
module.exports = mongoose.model('User', schema, 'user');