import { EXTEND_TITLE_ARR, getFlatMenuList } from "@/constants";
import { IMenuItem } from "@/constants/constantsType";
import { useRootStore } from "@/store";
import { Breadcrumb } from "antd";

import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * 面包屑
 * @returns
 */
const RenderBreadCrumb = () => {
  const [pageTitle, setPageTitle] = useState<IMenuItem>({
    parent: "",
    label: "",
    key: "",
  });

  // 拿到当前url
  const location = useLocation();
  const store = useRootStore();
  const menu = store.menu.menu;

  useEffect(() => {
    // 获取页面标题
    const flatMenuList = [...getFlatMenuList(menu), ...EXTEND_TITLE_ARR];

    const _pageTitle = flatMenuList.find((item) => {
      return item.key === location.pathname;
    });

    if (_pageTitle) {
      // 使用 runInAction 包裹状态修改

      setPageTitle(_pageTitle);
    } else {
    }
  }, [location.pathname, menu]);

  return (
    <Breadcrumb
      separator=">"
      style={{ margin: "16px 0" }}
      items={[
        {
          title: pageTitle?.parent,
        },
        {
          title: pageTitle?.label,
        },
      ]}
    />
  );
};

export default observer(RenderBreadCrumb);
