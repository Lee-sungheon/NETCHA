const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/netcha", {
      target: "https://j4d105.p.ssafy.io:",
      changeOrigin: true,
    })
  );
};
