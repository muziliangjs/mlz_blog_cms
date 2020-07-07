module.exports = {
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