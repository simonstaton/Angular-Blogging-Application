var Post = require('../models/post.js');

module.exports = {

	view: function(req, res){
		Post.find({published: true})
			.sort('date')
			.limit(10)
			.populate('submitter', {password: 0})
			//.populate('categories')
			.exec(function(error, posts) {
				if (posts) {
					res.send(posts);
				} else {
					res.statusCode = 500;
					res.send(err);
				}
			});
	},

	get: function(req, res){
		Post.findOne(JSON.parse(req.params.data))
			//.populate('submitter', {password: 0})
			//.populate('categories')
			.exec(function(error, post) {
				if (error) {
					res.statusCode = 404;
					res.send(error);
				} else {
					res.send(post);
				}
			});
	},

	edit: function(req, res){
		Post.findById(req.body._id)
			.exec(function(error, post) {
				if (error) {
					res.statusCode = 404;
					res.send(error);
				} else {
					post.set(req.body)
						.save(function(error) {
							if (error) {
								res.statusCode = 404;
								res.send(error);
							} else {
								res.send(post);
							}
						});
				}
			});
	},

	delete: function(req, res){
		Post.findOne(req.params.data)
			.exec(function(error, post) {
				if (error) {
					res.statusCode = 404;
					res.send(error);
				} else {
					post.remove(function(error) {
						if (error) {
							res.statusCode = 403;
							res.send(error);
						} else {
							res.send('success');
						}
					});
				}
			});
	},

	create: function(req, res){

		var post = new Post({
				title: req.body.title,
				slug: req.body.slug,
				submitter: req.body.submitter,
				content: req.body.content,
				date: new Date(),
				image: req.body.image,
				published: true
			});

		post.save(function(error){
			if (error) {
				res.statusCode = 403;
				res.send(error);
			} else {
				res.send(post);
			}
		});


	}

}