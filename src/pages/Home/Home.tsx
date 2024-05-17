import React, { useState } from "react";
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from "@ant-design/icons";
import { Button, ConfigProvider, Layout, Menu, theme } from "antd";
import styles from "./index.module.scss";

const { Header, Sider, Content } = Layout;

const Home: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            siderBg: "#2c3e50",
          },
          Menu: {
            darkItemBg: "#2c3e50",
            darkSubMenuItemBg: "#2c3e50",
            darkItemHoverBg: "#34495e",
          },
        },
      }}
    >
      <Layout style={{ height: "100%" }}>
        <Sider trigger={null}>
          <div className="demo-logo-vertical" />
          <h2 className={styles.title}>流转卡网站管理 </h2>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                label: "新豪轴承",
                children: [
                  { key: "5", label: "Option 5" },
                  { key: "6", label: "Option 6" },
                  { key: "7", label: "Option 7" },
                  { key: "8", label: "Option 8" },
                ],
              },
              {
                key: "2",
                label: "链条流转卡",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Home;
