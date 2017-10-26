var webpack = require('webpack')
    , path = require('path');
;

module.exports = {
    watch: true,
    entry: './src/index.js',
    output: {
        filename: './dist/bundle.min.js',

    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        })
    ],
    resolve: { 
        extensions: ['.js', '.jsx']
    },
    devtool: '#inline-source-map'
}
