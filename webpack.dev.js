const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.base.js');
const liveReloadPlugin = require('webpack-livereload-plugin');

module.exports = function(env) {
	return webpackMerge(commonConfig(), {
		devtool: 'eval',
		plugins: [
		  new liveReloadPlugin()
		]
	});
}
