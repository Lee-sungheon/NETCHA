const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware(
      '/netcha', {
      target: 'http://j4d105.p.ssafy.io:9000',
      changeOrigin: true,
    })
  );
};
