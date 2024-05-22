const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/target",
    createProxyMiddleware({
      target: "http://192.168.70.111:8080",
      changeOrigin: true,
      pathRewrite: {
        "/target": "",
      },
    })
  );
};
