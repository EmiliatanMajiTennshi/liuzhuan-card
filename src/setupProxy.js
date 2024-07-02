const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/target",
    createProxyMiddleware({
      target: "http://192.168.20.86:8081/api",
      changeOrigin: true,
      pathRewrite: {
        "/target": "",
      },
    })
  );
  app.use(
    "/apiLz",
    createProxyMiddleware({
      target: "http://192.168.20.86:8081/api",
      changeOrigin: true,
      pathRewrite: {
        "/apiLz": "",
      },
    })
  );
};
