
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
					// load up optional loads
					loaders: {
						// Sass (scss) Loader
						scss: ExtractTextPlugin.extract({
							fallback: 'style-loader',
							use: [
								'css-loader',
								'sass-loader',
								{
									loader: 'sass-resources-loader',
									options: {
										resources: path.resolve(__dirname, 'client/src/sass/_variables.scss')
									}
								}
							]
						})
					}
				}
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
					use: [
						'css-loader',
						'sass-loader',
						{
							loader: 'sass-resources-loader',
							options: {
								resources: path.resolve(__dirname, 'client/src/sass/_variables.scss')
							}
						}]
				})
			}
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
