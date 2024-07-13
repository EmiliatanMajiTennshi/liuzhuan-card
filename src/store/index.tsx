import React, { ReactNode, createContext, useContext } from "react";
import User from "./User";
import PageTitle from "./PageTitle";
import TableRecord from "./TableRecord";
import Menu from "./Menu";

/**
 * RootStore
 */
class RootStore {
  user: User;
  pageTitle: PageTitle;
  tableRecord: TableRecord;
  menu: Menu;
  constructor() {
    this.user = new User();
    this.pageTitle = new PageTitle();
    this.tableRecord = new TableRecord();
    this.menu = new Menu();
  }
}

const rootStore = new RootStore();

// 创建上下文,封装成组件
const RootStoreContext = createContext(rootStore);

interface RootStoreProviderProps {
  children: ReactNode;
}

/**
 * RootStoreProvider
 * @returns
 */
const RootStoreProvider = ({ children }: RootStoreProviderProps) => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

export default RootStoreProvider;

/**
 * 封装获取上下文对象的方法
 * @returns
 */
export const useRootStore = (): RootStore => {
  return useContext(RootStoreContext);
};
