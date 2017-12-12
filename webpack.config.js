
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT = path.resolve(__dirname);

const sassLoader = ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: [
		'css-loader',
		'sass-loader',
		{
			loader: 'sass-resources-loader',
			options: {
				resources: [path.resolve(__dirname, 'client/src/sass/_variables.scss')]
			}
		}
	]
});

module.exports = {
	entry: {
		main: './client/src/index.js'
	},
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
					// load up optional loaders
					loaders: {
						// Sass (scss) Loader
						scss: sassLoader
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
				use: sassLoader
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
