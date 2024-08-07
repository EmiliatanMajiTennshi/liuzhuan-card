import React from "react";
import { App as AppAnt, ConfigProvider } from "antd";
import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from "@ant-design/cssinjs";
import { HashRouter as Router } from "react-router-dom";
import PrivateRoute from "./router/PrivateRoute";
import "./App.css";
import locale from "antd/locale/zh_CN";
import dayjs from "dayjs";

import "dayjs/locale/zh-cn";
// 换成中文
dayjs.locale("zh-cn");
console.log("test1");

function App() {
  return (
    <StyleProvider
      hashPriority="high"
      transformers={[legacyLogicalPropertiesTransformer]}
    >
      {/* 关闭降权操作，移除 :where() 选择器 */}
      <AppAnt>
        {/* Ant Design 提供的包裹组件，用于使得 Message、Modal、Notification 等组件的静态调用形式能获取到上下文，从而读取移除 :where() 选择器的配置  */}

        <Router>
          <ConfigProvider locale={locale}>
            <PrivateRoute></PrivateRoute>
          </ConfigProvider>
        </Router>
      </AppAnt>
    </StyleProvider>
  );
}

export default App;
