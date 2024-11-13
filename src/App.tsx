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
import RootStoreProvider from "./store";
import "dayjs/locale/zh-cn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// 换成中文
dayjs.locale("zh-cn");
// const getHtml = async () => {
//   const html = await fetch("/").then((res) => res.text()); //读取index html
//   return html;
// };
// const init = async () => {
//   const res = await getHtml();
//   console.log({ a: res }, 124214);
// };
// init();

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
            <RootStoreProvider>
              <PrivateRoute></PrivateRoute>
            </RootStoreProvider>
          </ConfigProvider>
        </Router>
      </AppAnt>
      <ToastContainer position="top-center" autoClose={2000} />
    </StyleProvider>
  );
}

export default App;
