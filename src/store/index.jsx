import React, { createContext, useContext } from "react";
import User from "./User";

class RootStore {
  constructor() {
    this.user = new User();
  }
}

const rootStore = new RootStore();

// 创建上下文,封装成组件
const RootStoreContext = createContext();

const RootStoreProvider = ({ children }) => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

export default RootStoreProvider;

// 封装获取上下文对象的方法
export const useRootStore = () => {
  return useContext(RootStoreContext);
};