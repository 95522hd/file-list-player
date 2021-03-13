const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
	entry: {
		index: './src/index.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'less-loader'
				]
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.(gif|png|jpg|jpeg|bmp|ttf|svg|woff|woff2|eot)$/,
				loader: 'file-loader',
				options: {
					name: '[name][hash].[ext]',
					limit: 1024 * 8
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			hash: true
		}),
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin()
	],
	devServer: {
		host: '0.0.0.0',
		port: 8000,
		hot: true,
		open: true
	},
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	resolve: {
		extensions: ['.js', '.vue']
	}
}