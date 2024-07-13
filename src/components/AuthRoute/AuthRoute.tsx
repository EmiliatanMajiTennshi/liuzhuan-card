import { getUserInfo } from "@/api";
import { useRootStore } from "@/store";

import { Navigate } from "react-router-dom";
import { IAuthRoute, IRes } from "./AuthRouteType";
import { useEffect, useState } from "react";
import { Skeleton, message } from "antd";
import { removeToken } from "@/utils";

const AuthRoute = ({ children }: IAuthRoute) => {
  const [allowLogin, setAllowLogin] = useState<boolean | null>(null);
  const store = useRootStore();
  const userStore = store.user;
  const setUserInfo = userStore.setUserInfo;

  useEffect(() => {
    getUserInfo()
      .then((res: IRes) => {
        if (res?.data?.data) {
          setUserInfo(res?.data?.data);
          setAllowLogin(true);
        } else {
          setAllowLogin(false);
          message.error("登录已过期或者服务器连接失败");
          removeToken();
        }
      })
      .catch((err) => {
        console.log(err);
        setAllowLogin(false);
      });
  }, []);

  if (allowLogin === null) {
    // 显示加载指示器或空状态
    return <Skeleton active />;
  }

  return allowLogin ? children : <Navigate to="/login"></Navigate>;
};

export default AuthRoute;
