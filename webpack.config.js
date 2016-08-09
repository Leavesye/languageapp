var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        //vendor: ['./src/js/lib/jquery.min.js', './src/js/lib/semantic.min.js'],
        app: './src/js/app.jsx',
    },
    output: {
        path: path.join(__dirname, "/dist/js"),
        publicPath: '/static/',
        filename: '[name].js'
    },
    devtool: '#inline-source-map',
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    // plugins: [
    //     new webpack.ProvidePlugin({
    //         $: "jquery",
    //         jQuery: "jquery",
    //         "window.jQuery": "jquery"
    //     }),
    // ],
}
