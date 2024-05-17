import { makeAutoObservable, runInAction } from "mobx";
import { setToken as _setToken, getToken } from "@/utils";

class User {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  token = getToken() || "";
  setToken(token) {
    runInAction(() => {
      this.token = token || "";
      _setToken(token);
    });
  }
}

export default User;
