import { makeAutoObservable, runInAction } from "mobx";

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
