import { Button, ConfigProvider, Menu, Skeleton, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import * as Icon from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import classNames from "classnames";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import styles from "./index.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { getMenu } from "@/api";
import { IRes } from "./RenderSiderType";
import { useRootStore } from "@/store";
import { observer } from "mobx-react-lite";
import { IMenuItem } from "@/constants/constantsType";
import { MENULIST } from "@/constants/constants";

/**
 * 把menu里的icon从字符串转成元素
 * @param menu
 * @returns
 */
const handleIcon = (menu: IMenuItem[]) => {
  menu.forEach((item) => {
    if (item.icon) {
      const antIcon: { [key: string]: any } = Icon;
      item.icon = React.createElement(antIcon[item.icon]) as ReactNode;
    }
    if (item?.children) {
      handleIcon(item.children);
    }
  });
  return menu;
};

/**
 * 页面侧边栏
 * @returns
 */
const RenderSider = () => {
  const [collapsed, setCollapsed] = useState(
    localStorage.getItem("menu_collapsed") === "false" ? false : true
  );
  const [currentOpenKey, setCurrentOpenKey] = useState("");

  const store = useRootStore();

  const menu = store.menu.menu;

  const _setMenu = store.menu.setMenu;

  const handleMenu = (menu: any) => {
    if (menu) {
      localStorage.setItem(MENULIST, JSON.stringify(menu));
      const _menu = handleIcon(menu);
      _setMenu(_menu);
    } else {
      _setMenu([]);
    }
  };
  useEffect(() => {
    getMenu()
      .then((res: IRes) => {
        const _menu = res?.data?.data;

        handleMenu(_menu);
      })
      .catch((e) => {
        console.log(e, 123);
      });
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 拿到当前url
  const location = useLocation();
  // 路由
  const navigate = useNavigate();

  // 菜单点击切换
  const onMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  // 菜单折叠
  const handleCollapsed = () => {
    setCollapsed(!collapsed);
    localStorage.setItem("menu_collapsed", (!collapsed).toString());
  };

  // 刷新后仍然可以展开对应子菜单
  const _currentOpenKey = useMemo(() => {
    return menu.find((item) => {
      return (
        item?.children?.findIndex((subItem) => {
          return subItem.key === location.pathname;
        }) !== -1
      );
    })?.key;
  }, [menu, location.pathname]);

  useEffect(() => {
    if (_currentOpenKey && _currentOpenKey !== currentOpenKey) {
      setCurrentOpenKey(_currentOpenKey || "");
    }
  }, [_currentOpenKey, currentOpenKey]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: "#fff",
          },
          Menu: {
            darkItemBg: "#2c3e50",
            darkSubMenuItemBg: "#2c3e50",
            darkItemHoverBg: "#34495e",
            activeBarBorderWidth: 0,
          },
        },
      }}
    >
      <Sider
        trigger={null}
        className={classNames({
          [styles.aside]: true,
        })}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <div style={{ height: "100%" }}>
          {menu.length !== 0 ? (
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={[location.pathname]}
              onClick={onMenuClick}
              defaultOpenKeys={[currentOpenKey]}
              items={menu}

              // inlineCollapsed={true}
            ></Menu>
          ) : (
            <Skeleton active />
          )}
        </div>
        <Button
          className={styles["collapse-button"]}
          type="text"
          icon={
            collapsed ? (
              <MenuUnfoldOutlined
                style={{ fontSize: 18 }}
                title="点击展开菜单"
              />
            ) : (
              <MenuFoldOutlined style={{ fontSize: 18 }} title="点击收起菜单" />
            )
          }
          onClick={handleCollapsed}
        />
      </Sider>
    </ConfigProvider>
  );
};

export default observer(RenderSider);
