module.exports = {
	productionSourceMap: false,
	chainWebpack: config => {
		config.externals({
			"jquery": "jQuery"
		})
	}
};
