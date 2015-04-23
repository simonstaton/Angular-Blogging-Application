var uuid = require('node-uuid'),
	fs = require('fs'),
	multiparty = require('multiparty');

module.exports = {

	image: function(req, res){

		new multiparty.Form().parse(req, function(error, fields, files){

			var file = files.file[0],
				contentType = file.headers['content-type'],
				localPath = file.path,
				extension = (localPath.lastIndexOf('.') < 0) ? '' : localPath.substr(localPath.lastIndexOf('.')),
				fileName = uuid.v4() + extension,
				rootPath = __rootDir+'\\public\\',
				publicPath = 'assets\\images\\uploads\\' + fileName,
				destPath = rootPath+publicPath;

			if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
				fs.unlink(localPath);
				return res.status(400).send('Unsupported file type.');
			}

			fs.rename(localPath, destPath, function(error) {
				if (error) {
					return res.status(400).send(error);
				}
				return res.json(publicPath);
			});

		});

	},

	deleteFile: function(req, res){

		fs.unlink(__rootDir+'\\public\\'+decodeURIComponent(req.params.file), function(error){
			if (error){
				res.status(400);
				res.send(error);
			}
			res.send('ok');
		});

	}

}