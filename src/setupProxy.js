const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/target",
    createProxyMiddleware({
      target: "http://desktop-44ime94:7800/lzcard/v1",
      changeOrigin: true,
      pathRewrite: {
        "/target": "",
      },
    })
  );
  app.use(
    "/apiLz",
    createProxyMiddleware({
      target: "http://china-20240408x:7800/lzcard/v1",
      changeOrigin: true,
      pathRewrite: {
        "/apiLz": "",
      },
    })
  );
};
