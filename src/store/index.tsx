import React, { ReactNode, createContext, useContext } from "react";
import User from "./User";
import PageTitle from "./PageTitle";
import TableRecord from "./TableRecord";

class RootStore {
  user: User;
  pageTitle: PageTitle;
  tableRecord: TableRecord;
  constructor() {
    this.user = new User();
    this.pageTitle = new PageTitle();
    this.tableRecord = new TableRecord();
  }
}

const rootStore = new RootStore();

// 创建上下文,封装成组件
const RootStoreContext = createContext(rootStore);

interface RootStoreProviderProps {
  children: ReactNode;
}
const RootStoreProvider = ({ children }: RootStoreProviderProps) => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

export default RootStoreProvider;

// 封装获取上下文对象的方法
export const useRootStore = (): RootStore => {
  return useContext(RootStoreContext);
};
