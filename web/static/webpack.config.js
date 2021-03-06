const path = require('path');
const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
    	bundle: ['./app/admin/index.js'],
    	//bundle2: ['./app/photographer/index.js'],
        //bundle3: ['./app/admin/index.js']
    },
    devtool: 'source-map',
    cache: true,
    //debug: true,
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    resolve: {
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.js$/,//path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: [['env', {"modules":false}], 'react', 'stage-1'],
                    plugins: ['transform-object-assign', 'transform-class-properties']
                }
            },
            //{ 
                //test: /\.css$/,
                //loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            //}
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            sourceMap: true,
        }),
        //new ExtractTextPlugin('[name].css'),
        new webpack.DefinePlugin({
            "process.env": { 
                //NODE_ENV: JSON.stringify("production")
                NODE_ENV: JSON.stringify("dev") 
            }
        }),
        new webpack.LoaderOptionsPlugin({
        	debug: true
        }),
        
    ],
    //     new webpack.HotModuleReplacementPlugin()
    watch : true 
/*    watchOptions : {
        aggregateTimeout : 100
    }*/
};