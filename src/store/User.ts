import { makeAutoObservable, runInAction } from "mobx";
import { setToken as _setToken, getToken } from "@/utils";
import { IUserInfo } from "@/components/AuthRoute/AuthRouteType";

const initUser = {
  account: "",
  avatarPath: "",
  id: null,
  password: "",
  regTime: "",
  sex: null,
  username: "",
};
/**
 * user的store
 */
class User {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  token = getToken() || "";
  userInfo: IUserInfo = initUser;
  setToken(token: string) {
    runInAction(() => {
      this.token = token || "";
      _setToken(token);
    });
  }
  setUserInfo(userInfo: IUserInfo) {
    runInAction(() => {
      this.userInfo = userInfo;
    });
  }
}

export default User;
