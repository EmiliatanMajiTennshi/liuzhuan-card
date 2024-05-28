import React, { useEffect, useState } from "react";
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from "@ant-design/icons";
import { Button, ConfigProvider, Layout, Menu, theme } from "antd";
import styles from "./index.module.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { logoutRequest } from "@/api/logoutRequest";
import { getUserlist } from "@/api";
import { menuList, flatMenuList } from "@/constant";

const { Header, Sider, Content } = Layout;

const Home: React.FC = () => {
  const [pageTitle, setPageTitle] = useState("");
  const [currentOpenKey, setCurrentOpenKey] = useState("");

  // 拿到当前url
  const location = useLocation();
  useEffect(() => {
    // 获取页面标题
    const _pageTitle = flatMenuList.find((item) => {
      return item.key === location.pathname;
    })?.label;
    setPageTitle(_pageTitle || "");
  }, [location.pathname]);

  // 刷新后仍然可以展开对应子菜单
  const _currentOpenKey = menuList.find((item) => {
    return (
      item?.children?.findIndex((subItem) => {
        return subItem.key === location.pathname;
      }) !== -1
    );
  })?.key;
  if (_currentOpenKey && _currentOpenKey !== currentOpenKey) {
    setCurrentOpenKey(_currentOpenKey || "");
  }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 路由
  const navigate = useNavigate();

  // 菜单点击切换
  const onMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  // 退出登录
  const handleLogout = async () => {
    const res = (await logoutRequest()) as any;
    // res.data 的格式是 redirect:/login
    const route = res?.data?.split(":")[1];
    if (typeof route === "string" && route.indexOf("/") !== -1) {
      navigate(res);
    } else {
      navigate("/");
    }
  };
  const getUserlist1 = () => {
    getUserlist({ page: 1, rows: 10 });
  };
  console.log(currentOpenKey, 1111);

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
        <Sider trigger={null} width={240} className={styles.aside}>
          <div className="demo-logo-vertical" />
          <h2 className={styles.title}>流转卡管理系统 </h2>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            onClick={onMenuClick}
            defaultOpenKeys={[currentOpenKey]}
            items={menuList}
          />
        </Sider>
        <Layout style={{ minWidth: "1000px" }}>
          <Header
            style={{
              padding: "0px 24px",
              background: colorBgContainer,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontSize: 24,
                background: colorBgContainer,
              }}
            >
              {pageTitle}
            </div>
            <div>
              <Button type="link" onClick={handleLogout}>
                退出登录
              </Button>
              <Button type="link" onClick={getUserlist1}>
                获取用户列表
              </Button>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: "auto",
            }}
          >
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Home;
