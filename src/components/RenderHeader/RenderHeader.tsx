import React, { startTransition } from "react";
import Logo from "@/assets/images/logo5.png";
import { Header } from "antd/es/layout/layout";
import { logoutRequest } from "@/api";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Button, Dropdown, MenuProps, Space } from "antd";
import styles from "./index.module.scss";
import { useRootStore } from "@/store";
import { DEFAULT_ORANGE } from "@/constants";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
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
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button type="link" onClick={handleLogout}>
          退出登录
        </Button>
      ),
    },
  ];
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
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ color: "#fff" }}>你好，{userInfo?.username}</span>

        <Dropdown menu={{ items }}>
          <Space>
            <span
              style={{
                marginLeft: 10,
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: DEFAULT_ORANGE,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              {userInfo?.username[0]}
            </span>
          </Space>
        </Dropdown>
      </div>
    </Header>
  );
};

export default RenderHeader;
