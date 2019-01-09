var conf = require('./conf.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var UglifyjsPlugin = require('uglifyjs-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var webpack = require('webpack');

var getHtmlConfig = function (name, title) {
    return {
        template: './src/page/' + name + '/' + name + '.html',
        filename: 'page/' + name + '.html',
        favicon: './favicon.ico',
        title: title,
        chunks: ['common', name],
        hash: true,
        chunksSortMode: 'manual', // 排序方式，按上述顺序依次添加JS
        publicPath: conf.resourcePath
    };
};

var config = {
    devServer: {
        host: conf.devServerHost,
        disableHostCheck: true,
        port: conf.devServerPort
    },
    entry: {
        'common': ['./src/page/common/common.js'],
        'login': ['./src/page/login/login.js'],
        'register': ['./src/page/register/register.js'],
        'home': ['./src/page/home/home.js'],
        'list': ['./src/page/list/list.js'],
        'index': ['./src/page/index/index.js'],
        'detail': ['./src/page/detail/detail.js'],
    },
    output: {
        path: conf.path,
        publicPath: conf.resourcePath,
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/, loader: ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback: 'style-loader'
            })
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf|ico)\??.*$/,
                loader: 'url-loader?limit=20000&name=resource/[name].[ext]'
            },
            {
                test: /\.string$/,
                loader: 'html-loader'
            }
        ]
    },
    resolve: {
        alias: {
            root: __dirname,
            node_modules: __dirname + '/node_modules',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            util: __dirname + '/src/util',
            image: __dirname + '/src/image'
        }
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: __dirname + '/node_modules/layui-src/dist',
            to: __dirname + '/dist/lib/layui'
        }, {
            from: __dirname + '/node_modules/jquery/dist',
            to: __dirname + '/dist/lib/jquery'
        }]),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        new webpack.DefinePlugin({
            'debug': conf.debug
        }),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('login', '爆炸糖')),
        new HtmlWebpackPlugin(getHtmlConfig('register', '爆炸糖')),
        new HtmlWebpackPlugin(getHtmlConfig('home', '爆炸糖')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '爆炸糖')),
        new HtmlWebpackPlugin(getHtmlConfig('index', '爆炸糖')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '爆炸糖')),
    ]
};

if (conf.release) {
    config.plugins.push(new UglifyjsPlugin());
    config.plugins.push(new OptimizeCssAssetsPlugin({cssProcessorOptions: {safe: true}}));
}

module.exports = config;