import React, { useState } from "react";
import { ConfigProvider, Card } from "antd";
import styles from "./index.module.scss";
import { observer } from "mobx-react";
import LoginBannerBgImg from "../../assets/images/banner.a05effbe434b6c99458f.jpg";
import { LoginCom } from "../../components/LoginCom";
import { RegisterCom } from "../../components/RegisterCom";
import "animate.css";

const tabList = [
  {
    key: "tab1",
    tab: "登录",
  },
  // {
  //   key: "tab2",
  //   tab: "注册",
  // },
];
const Login = observer(() => {
  const [activeTabKey, setActiveTabKey] = useState("tab1");

  // 切换tab的回调
  const onTabChange = (key: string) => {
    console.log(key);
    setActiveTabKey(key);
  };
  return (
    <div className={`${styles["login-page"]} `}>
      <div className={styles["login-form"]}>
        <ConfigProvider
          theme={{
            components: {
              Form: {
                /* 这里是你的组件 token */
                labelFontSize: 13,
                labelColor: "#18181b",
              },
            },
          }}
        >
          <Card
            title={<h2 style={{ margin: "10px 0" }}>欢迎访问 </h2>}
            tabList={tabList}
            onTabChange={onTabChange}
            activeTabKey={activeTabKey}
            className="animate__animated animate__fadeInDown"
          >
            {activeTabKey === "tab1" && (
              <LoginCom setActiveTabKey={setActiveTabKey} />
            )}
            {activeTabKey === "tab2" && (
              <RegisterCom setActiveTabKey={setActiveTabKey} />
            )}
          </Card>
        </ConfigProvider>
      </div>
      <div className={styles["login-bg"]}>
        <img src={LoginBannerBgImg} alt="" />
      </div>
    </div>
  );
});

export default Login;
