import React, { useEffect, useState, Suspense } from "react";
import * as Icon from "@ant-design/icons";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  ConfigProvider,
  Layout,
  Menu,
  Skeleton,
  theme,
} from "antd";
import styles from "./index.module.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { logoutRequest } from "@/api/logoutRequest";
import { getMenu } from "@/api";
import { getFlatMenuList } from "@/constant";
import Logo from "@/assets/images/logo6.png";
import classNames from "classnames";
import { IMenuItem } from "@/constant/menuList";

const { Header, Sider, Content } = Layout;

const Home: React.FC = () => {
  const [pageTitle, setPageTitle] = useState<IMenuItem>({
    parent: "",
    label: "",
    key: "",
  });
  const [currentOpenKey, setCurrentOpenKey] = useState("");
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("menu_collapsed") === "false" ? false : true
  );
  const [menu, setMenu] = useState<IMenuItem[]>([]);

  const handleMenu = (menuString: string) => {
    localStorage.setItem("menuList", menuString);
    const _menu = JSON.parse(menuString);
    console.log(1123, menuString);

    if (_menu) {
      _menu.forEach((item: any) => {
        if (item.icon) {
          // 把icon从字符串处理成dom元素
          const antIcon: { [key: string]: any } = Icon;
          item.icon = React.createElement(antIcon[item.icon]);
        }
      });
      setMenu(_menu);
    }
  };
  useEffect(() => {
    // 获取列表
    if (localStorage.getItem("menuList")) {
      const menuString = localStorage.getItem("menuList") || "";
      handleMenu(menuString);
      return;
    }

    getMenu()
      .then((res: any) => {
        const menuString = res?.data?.[0]?.message || "";
        handleMenu(menuString);
      })
      .catch((e) => {
        console.log(e, 123);
      });
  }, []);

  // 拿到当前url
  const location = useLocation();
  console.log(location, 11112);

  useEffect(() => {
    // 获取页面标题
    const flatMenuList = getFlatMenuList(menu);
    const _pageTitle = flatMenuList.find((item) => {
      return item.key === location.pathname;
    });
    if (_pageTitle) {
      setPageTitle(_pageTitle);
    }
  }, [location.pathname, menu]);
  console.log(pageTitle, 12);

  // 刷新后仍然可以展开对应子菜单
  const _currentOpenKey = menu.find((item) => {
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
    getMenu();
  };

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
    localStorage.setItem("menu_collapsed", (!collapsed).toString());
  };
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
        <Sider
          trigger={null}
          className={classNames({
            [styles.aside]: true,
          })}
          collapsible
          collapsed={collapsed}
          width={245}
        >
          <h2
            className={classNames({
              [styles.title]: true,
              [styles["collapsed-title"]]: collapsed,
            })}
          >
            <img
              src={Logo}
              width={64}
              alt=""
              onClick={handleCollapsed}
              style={{ cursor: "pointer" }}
            ></img>
            <span style={collapsed ? { visibility: "hidden" } : {}}>
              流转卡管理系统
            </span>
          </h2>
          {menu.length !== 0 ? (
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[location.pathname]}
              onClick={onMenuClick}
              defaultOpenKeys={[currentOpenKey]}
              items={menu}
              // inlineCollapsed={true}
            ></Menu>
          ) : (
            <Skeleton />
          )}
        </Sider>
        <Layout style={{ minWidth: "1000px" }}>
          <Header
            style={{
              padding: "0px 16px",
              background: colorBgContainer,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontSize: 18,
                background: colorBgContainer,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                style={{ marginRight: 10 }}
                type="text"
                icon={
                  collapsed ? (
                    <MenuUnfoldOutlined
                      style={{ fontSize: 18 }}
                      title="点击展开菜单"
                    />
                  ) : (
                    <MenuFoldOutlined
                      style={{ fontSize: 18 }}
                      title="点击收起菜单"
                    />
                  )
                }
                onClick={handleCollapsed}
              />

              {pageTitle.parent && (
                <Breadcrumb
                  separator=">"
                  items={[
                    {
                      title: pageTitle.parent,
                    },
                    {
                      title: pageTitle.label,
                    },
                  ]}
                />
              )}
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
            <Suspense fallback={<Skeleton active />}>
              <Outlet></Outlet>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default Home;
