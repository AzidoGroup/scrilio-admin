
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT = path.resolve(__dirname);

module.exports = {
	entry: ['./client/src/index.js'],
	output: {
		filename: 'bundle.js',
		publicPath: 'client/build/',
		path: path.resolve(ROOT, 'client', 'build')
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				exclude: /(node_modules)/,
				loader: 'vue-loader',
				options: {
					loaders: {
						sass: ExtractTextPlugin.extract({
							fallback: 'style-loader',
							use: [
								// 'vue-style-loader',
								'css-loader',
								'sass-loader?indentedSyntax=1'
								// {
								// 	loader: 'sass-resources-loader',
								// 	options: {
								// 		resources: path.resolve(__dirname, 'client/src/sass/_global.scss')
								// 	}
								// }
							]
						}),
						scss: ExtractTextPlugin.extract({
							fallback: 'style-loader',
							use: [
								// 'vue-style-loader',
								'css-loader',
								'sass-loader',
								{
									loader: 'sass-resources-loader',
									options: {
										resources: path.resolve(__dirname, 'client/src/sass/_global.scss')
									}
								}
							]
						})
					}
					// loaders: {
					// 	sass: [
					// 		'vue-style-loader',
					// 		'css-loader',
					// 		'sass-loader?indentedSyntax=1',
					// 		{
					// 			loader: 'sass-resources-loader',
					// 			options: {
					// 				resources: path.resolve(__dirname, 'client/src/sass/_global.scss')
					// 			}
					// 		}
					// 	],
					// 	scss: [
					// 		'vue-style-loader',
					// 		'css-loader',
					// 		'sass-loader',
					// 		{
					// 			loader: 'sass-resources-loader',
					// 			options: {
					// 				resources: path.resolve(__dirname, 'client/src/sass/_global.scss')
					// 			}
					// 		}
					// 	]
					// 	// scss: ExtractTextPlugin.extract({
					// 	// 	fallback: 'style-loader',
					// 	// 	use: [
					// 	// 		'css-loader',
					// 	// 		{
					// 	// 			loader: 'sass-loader',
					// 	// 			options: {
					// 	// 				data: '@import "_global";',
					// 	// 				includePaths: [
					// 	// 					path.resolve(ROOT, 'client/src/sass')
					// 	// 				]
					// 	// 			}
					// 	// 		}
					// 	// 	]
					// 	// })
					// }
				}
				// options: {
				// 	loader: ExtractTextPlugin.extract({
				// 		fallback: 'style-loader',
				// 		use: [
				// 			'css-loader',
				// 			'sass-loader',
				// 			{
				// 			}
				// 		]
				// 	})
				// }
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [ 'css-loader', 'sass-loader']
				})
			}
			// {
			// 	test: /\.scss$/,
			// 	use: [
			// 		'css-loader',
			// 		'sass-loader',
			// 		ExtractTextPlugin.extract({
			// 			fallback: 'style-loader',
			// 			use: ['css-loader', 'sass-loader']
			// 		})
			// 	]
			// }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: false,
			minify: false,
			template: path.resolve(ROOT, 'client', 'src', 'index.html')
		}),
		new ExtractTextPlugin({
			filename: '[name].css',
			allChunks: true
		})
	]
};
