// 通过 craco插件 修改create-react-app 创建的脚手架webpack
const path = require("path");

module.exports = {
  // webpack 配置
  webpack: {
    alias: {
      // 约定
      "@": path.resolve(__dirname, "src"),
    },
  },
};
