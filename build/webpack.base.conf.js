// nodejs 中的path模块
var path = require('path')
var config = require('../config')
var utils = require('./utils')
// __dirname是node里面的一个变量，指向的是当前文件夹目录
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
  entry: {
    app: './src/app.js'
  },
  // 输出配置
  output: {
    // 输出路径
    path: config.build.assetsRoot,
    // 指向异步加载的路径
    publicPath: config.build.assetsPublicPath,
    // 打包的js命名
    filename: '[name].js'
  },
  externals: {
    'zepto': 'Zepto',
    'wx': 'jWeixin'
  },
  // 当webpack试图去加载模块的时候，它默认是查找以 .js 结尾的文件的，它并不知道 .vue 结尾的文件是什么鬼玩意儿，
  // 所以我们要在配置文件中告诉webpack，遇到 .vue 结尾的也要去加载，添加 resolve 配置项
  resolve: {
    // 当我们去加载 ‘./components/Favlist’ 这样的模块时，webpack首先会查找 ./components/Favlist.js
    // 如果没有发现Favlist.js文件就会继续查找 Favlist.vue 文件
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'views': path.resolve(__dirname, '../src/views'),
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        // 使用vue-loader 加载 .vue 结尾的文件
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        // 使用了ES6的语法 import 语句，所以我们要使用 babel-loader 去加载我们的js文件
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      // 加载图片
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          // 当我们的图片大小小于10000字节的时候，webpack会把图片转换成base64格式插入到代码中，从而减少http请求
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders()
  }
}
