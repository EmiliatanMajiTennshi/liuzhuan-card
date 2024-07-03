import { IMenuItem } from "@/constants/constantsType";
import { makeAutoObservable, runInAction } from "mobx";

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
