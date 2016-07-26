var webpack = require("webpack"),
    path = require("path"),
    fs = require("fs"),
    autoprefixer = require('autoprefixer'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");// 独立css
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
// 读取入口文件
var jsDir = fs.readdirSync('./src/js/modules'), entryFiles = {};

for (var i = 0, len = jsDir.length; i < len; i++) {
    var fileList = jsDir[i].split('.');
    entryFiles[fileList[0]] = __dirname + '/src/js/modules/' + jsDir[i];
}

var date = new Date(),
    timeTxt = date.getFullYear() + "年" + (date.getMonth()+1) + "月" + date.getDate() + "日"
        + date.getHours() + ":" + date.getMinutes()+ ":" + date.getSeconds();

module.exports = {
    devtool: "source-map", // 便于调试
    entry: entryFiles,
    output: {
        publicPath: "http://localhost:8080/assets/",
        path: path.join(__dirname, "assets"),
        filename: "[name].js"
    },
    // watch: true,// 观察者模式
    module: {
        preLoaders: [
            // 预先加载的loader
        ],
        loaders: [
            {
                test: /\.css|\.less$/,
                loader: ExtractTextPlugin.extract("style", "css!postcss!less")
            },
            // {test: /\.less$/,loader: "style-loader!css-loader!autoprefixer-loader!less-loader?sourceMap"},
            // {test: /\.css$/, loader: "style!css!postcss"},
            {test: /\.(eot|woff|svg|ttf|woff2|gif|swf)(\?|$)/, loader: 'file?name=[hash].[ext]'},
            {test: /\.(png|jpg)$/, loader: 'url?limit=8192&name=[hash].[ext]'},
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel?presets=es2015'}
        ]
    },
    postcss: [ autoprefixer({ browsers: ['last 5 versions'] }) ],
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //    compress: {
        //        warnings: false
        //    }
        // }), // 压缩
        
        //全局引入，避免每个页面重复书写
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        // new webpack.HotModuleReplacementPlugin(),
        new CommonsChunkPlugin("commons", "commons.js"),
        new webpack.BannerPlugin('发布时间: '+ timeTxt),// 头部注释
        new ExtractTextPlugin("[name].css")

    ],
    resolve: {
        //查找module路径
        root: path.resolve(__dirname),
        //后缀名自动补全，即require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.less'],
        // 模块别名定义，方便后续直接引用别名
        alias: {
            'jquery': "../lib/jquery-2.2.4.min.js",
            'awesome': "../../style/css/awesome.less",
            'base': "../../style/css/base.less",
            'comCss': "../../style/css/com.less",
            'comJs': "../common/com",
            'msg': "../components/message.js"
        }
    }
};
