module.exports = function(grunt){

	grunt.initConfig({

		package: grunt.file.readJSON('package.json'),

		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			tasks: ['shell:mongo', 'nodemon', 'watch', 'compass'],
			dev: {
				tasks: ['shell:mongo', 'nodemon:dev']
			}
		},

		nodemon: {
			options: {
				script: '<%= package.main %>'
			},
			dev: {
				script: '<%= package.main %>',
				options: {
					ignore: ["*/**"],
					watch: false
				}
			}
		},

		shell: {
			mongo: {
				command: 'mongod',
				//command: 'sh checkMongod.sh', - fix this shell
				options: {
					async: true,
					stdout: false,
					stderr: true,
					failOnError: true,
					execOptions: {
						cwd: '.'
					}
				}
			}
		},

		jshint: {
			all: ['<%= package.js.source %>/**/*.js', '<%= package.js.components %>/**/*.js'] 
		},

		uglify: {
			build: {
				files: {
					'<%= package.js.dist %>/app.min.js': ['<%= package.js.source %>/**/*.js', '<%= package.js.components %>/**/*.js']
				}
			}
		},

		watch: {
			js: {
				files: ['<%= package.js.source %>/**/*.js', '<%= package.js.components %>/**/*.js'],
				tasks: ['jshint', 'uglify']
			}
		},
		
		compass: {
			options: {
				sassDir: '<%= package.css.source %>',
				cssDir: '<%= package.css.path %>',
				outputStyle: 'compressed',
				watch: true
			},
		 	dev: {
		 		options: {
		 			outputStyle: 'expanded',
		 			debugInfo: true,
		 			watch: true
		 		}
		 	}
		},

		clean: ['<%= package.js.libs %>'],

		copy: {
			main: {
				files: [
					{src: 'node_modules/jquery/dist/jquery.min.js', dest: '<%= package.js.libs %>/'},
					{src: 'node_modules/angular/angular.min.js', dest: '<%= package.js.libs %>/'},
					{src: 'node_modules/angular-cookies/angular-cookies.min.js', dest: '<%= package.js.libs %>/'},
					{src: 'node_modules/angular-animate/angular-animate.js', dest: '<%= package.js.libs %>/'},
					{src: 'node_modules/angular-route/angular-route.min.js', dest: '<%= package.js.libs %>/'},
					{src: 'node_modules/angular-file-upload/dist/**', dest: '<%= package.js.libs %>/'}
				]
			}
		},

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('makeLibs', ['clean', 'copy']);
	grunt.registerTask('default', ['makeLibs', 'jshint', 'uglify', 'concurrent']);	
	grunt.registerTask('dev', ['concurrent:dev']);	
	
};