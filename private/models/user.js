var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	username: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true },
	email: {type: String, required: true},
	groups: {type: [String], default: []}
});

module.exports = mongoose.model('User', UserSchema);