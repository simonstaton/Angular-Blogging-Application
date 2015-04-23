var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var PostSchema = new Schema({
	title: {type: String, required: true},
	slug: {type: String, required: true, index: { unique: true } },
	content: {type: String, required: true},
	submitter: {type: ObjectId, required: true, ref: 'User'},
	categories: [{type: ObjectId, ref: 'Category'}],
	published: {type: Boolean, required: true, default: true},
	date: {type: Date, required: true},
	image: {type: String, required: false}
});

module.exports = mongoose.model('Post', PostSchema);