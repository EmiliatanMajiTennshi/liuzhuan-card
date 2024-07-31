import React, { startTransition } from "react";
import Logo from "@/assets/images/logo5.png";
import { Header } from "antd/es/layout/layout";
import { logoutRequest } from "@/api";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Button } from "antd";
import styles from "./index.module.scss";
import { useRootStore } from "@/store";

/**
 * 页面的header
 * @returns
 */
const RenderHeader = () => {
  // 路由
  const navigate = useNavigate();
  // 退出登录
  const handleLogout = async () => {
    logoutRequest();
    await startTransition(() => {
      navigate("/login");
    });
  };
  // store
  const store = useRootStore();
  const userInfo = store.user.userInfo;
  console.log(userInfo, store, 112);

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      className={styles.header}
    >
      <div
        style={{
          fontSize: 18,
          display: "flex",
          alignItems: "center",
        }}
      >
        <h2
          className={classNames({
            [styles.title]: true,
          })}
        >
          <img src={Logo} width={84} alt="" style={{ cursor: "pointer" }}></img>
          <span style={{ marginTop: 4, color: "#fff" }}>流转卡管理系统</span>
        </h2>
      </div>
      <div>
        <Button type="link" onClick={handleLogout} style={{ color: "#fff" }}>
          退出登录
        </Button>
      </div>
    </Header>
  );
};

export default RenderHeader;
