import { getUserInfo } from "@/api";
import { useRootStore } from "@/store";

import { Navigate, useNavigate } from "react-router-dom";
import { IAuthRoute, IRes } from "./AuthRouteType";
import { useEffect, useState } from "react";
import { Skeleton, message } from "antd";
import { removeToken } from "@/utils";
import { TOKEN_ERROR } from "@/constants";

const AuthRoute = ({ dashboardFlag, children }: IAuthRoute) => {
  console.log(dashboardFlag, 1241);

  const [allowLogin, setAllowLogin] = useState<boolean | null>(null);
  const store = useRootStore();
  const userStore = store.user;
  const setUserInfo = userStore.setUserInfo;

  const navigate = useNavigate();

  if (dashboardFlag && window.location.hash === "#/") {
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
          message.error(TOKEN_ERROR);
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
