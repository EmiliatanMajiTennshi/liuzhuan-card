const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/target",
    createProxyMiddleware({
      // target: "http://192.168.20.65:8081/api",
      target: "http://192.168.20.198:8081/api",
      changeOrigin: true,
      pathRewrite: {
        "/target": "",
      },
    })
  );
  app.use(
    "/targetMJ",
    createProxyMiddleware({
      target: "http://192.168.20.8:8087",
      changeOrigin: true,
      pathRewrite: {
        "/targetMJ": "",
      },
    })
  );
  app.use(
    "/apiDJ",
    createProxyMiddleware({
      target: "http://192.168.20.222:90/lz",
      changeOrigin: true,
      pathRewrite: {
        "/apiDJ": "",
      },
    })
  );
};
