import { makeAutoObservable, runInAction } from "mobx";

/** 页面标题store */
class PageTitle {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  pageTitle = "";
  setPageTitle(title: string) {
    runInAction(() => {
      this.pageTitle = title;
    });
  }
}

export default PageTitle;
