var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var CategorySchema = new Schema({
	title: {type: String, required: true},
	slug: {type: String, required: true, index: { unique: true } },
	description: {type: String, required: true},
	posts: [{type: ObjectId, ref: 'Post'}],
});

module.exports = mongoose.model('Category', CategorySchema);