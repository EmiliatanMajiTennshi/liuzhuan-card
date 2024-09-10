import { getUserInfo } from "@/api";
import { useRootStore } from "@/store";

import { Navigate, useNavigate } from "react-router-dom";
import { IAuthRoute, IRes } from "./AuthRouteType";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { removeToken } from "@/utils";

const AuthRoute = ({ dashboardFlag, children }: IAuthRoute) => {
  const [allowLogin, setAllowLogin] = useState<boolean | null>(null);
  const store = useRootStore();
  const userStore = store.user;
  const setUserInfo = userStore.setUserInfo;

  const navigate = useNavigate();
  console.log(window.location.hash, 142);

  if (
    dashboardFlag &&
    (window.location.hash === "#/" || window.location.hash === "")
  ) {
    navigate("/dashboard");
  }

  useEffect(() => {
    getUserInfo()
      .then((res: IRes) => {
        if (res?.data?.data) {
          setUserInfo(res?.data?.data);
          setAllowLogin(true);
        } else {
          setAllowLogin(false);

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
