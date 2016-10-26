// 引入必要的模块
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

// 创建一个express实例
var app = express()
// 调用webpack并把配置传递过去
var compiler = webpack(webpackConfig)

// 使用 webpack-dev-middleware 中间件, 要作为express中间件使用，所以称它们为中间件,对webpack一个简单的包装，
// 它可以通过连接服务器服务那些从webpack发射出来的文件
// 1. 不会向硬盘写文件，而是在内存中，注意我们构建项目实际就是向硬盘写文件。
// 2. 当文件改变的时候，这个中间件不会再服务旧的包，你可以直接帅新浏览器就能看到最新的效果，这样你就不必等待构建的时间，所见即所得。
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

// 所谓的热加载，意思就是说能够追踪我们代码的变化，并自动更新界面，甚至还能保留程序状态
var hotMiddleware = require('webpack-hot-middleware')(compiler)
// webpack插件，监听html文件改变事件
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    // 发布事件
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

app.use(require('connect-history-api-fallback')())

// 注册中间件
app.use(devMiddleware)

app.use(hotMiddleware)

var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// 监听端口，开启服务器
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
