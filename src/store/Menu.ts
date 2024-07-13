import { IMenuItem } from "@/constants/constantsType";
import { makeAutoObservable, runInAction } from "mobx";

/** 菜单store */
class Menu {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  menu: IMenuItem[] = [];
  setMenu(menu: IMenuItem[]) {
    runInAction(() => {
      this.menu = menu || [];
    });
  }
}

export default Menu;
