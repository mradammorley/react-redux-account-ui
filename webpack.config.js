module.exports = {
	output: {
		filename: 'app.js',
	},
	module: {
		rules: [
			{
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react'],
					plugins: ['transform-object-rest-spread']
				}
			}

		]
	}


};