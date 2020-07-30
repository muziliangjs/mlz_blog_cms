module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '木子亮 - cms'
        return args
      })
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888/v1',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
};