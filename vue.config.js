const px2rem = require('postcss-px2rem')
var path = require('path')
const { off } = require('process')
module.exports={

    lintOnSave: "warning",
    css: { // 添加postcss配置
            loaderOptions: {
              postcss: {
                plugins: [
                  // 配置postcss-px2rem
                  px2rem({
                    remUnit: 37.5   // 设计稿等分后的rem值   375/10
                  })
                ]
              }
            }
          },

        devServer: {
            proxy: {
              '/api': { // 匹配所有以 '/api'开头的请求路径
                target: 'https://m.you.163.com', // 代理目标的基础路径
                changeOrigin: true, // 支持跨域
                pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
                  '^/api': ''
                }
              },
              '/aps': { // 匹配所有以 '/api'开头的请求路径
              target: 'https://goods.you.163.com', // 代理目标的基础路径
              changeOrigin: true, // 支持跨域
              pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
                '^/aps': ''
              }
            }
              // '/baidu': { // 匹配所有以 '/baidu'开头的请求路径
              //   target: 'http://www.baidu.com', // 代理目标的基础路径
              //   changeOrigin: true, // 支持跨域
              //   pathRewrite: { // 重写路径: 去掉路径中开头的'/baidu'
              //     '^/baidu': ''
              //   }
              // }
            }
          }
  

}