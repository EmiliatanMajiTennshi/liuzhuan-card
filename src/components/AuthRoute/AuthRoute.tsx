import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }: any) => {
  const token = getToken();
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
};

export default AuthRoute;
