var Category = require('../models/category.js');

module.exports = {

	view: function(req, res){
		Category.find({published: true})
			.sort('date')
			.exec(function(error, categories) {
				if (categories) {
					res.send(categories);
				} else {
					res.statusCode = 500;
					res.send(err);
				}
			});
	},

	get: function(req, res){
		Category.findOne(req.params.data)
			.populate('posts')
			.exec(function(error, category) {
				if (error) {
					res.statusCode = 404;
					res.send(error);
				} else {
					res.send(category);
				}
			});
	},

	edit: function(req, res){
		Category.findById(req.body._id)
			.exec(function(error, category) {
				if (error) {
					res.statusCode = 404;
					res.send(error);
				} else {
					category.set(req.body)
						.save(function(error) {
							if (error) {
								res.statusCode = 404;
								res.send(error);
							} else {
								res.send(category);
							}
						});
				}
			});
	},

	delete: function(req, res){
		Category.findOne(req.params.data)
			.exec(function(error, category) {
				if (error) {
					res.statusCode = 404;
					res.send(error);
				} else {
					category.remove(function(error) {
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

		var category = new Category({
				title: req.body.title,
				slug: req.body.slug,
				description: req.body.description
			});

		category.save(function(error){
			if (error) {
				res.statusCode = 403;
				res.send(error);
			} else {
				res.send(category);
			}
		});


	}

}