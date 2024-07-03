import { getUserList } from "./getUserList";
import { loginRequest } from "./loginRequest";
import { registerRequest } from "./registerRequest";
import { getMenu } from "./getMenu";
import { logoutRequest } from "./logoutRequest";
import { getUserInfo } from "./getUserInfo";
export {
  loginRequest,
  registerRequest,
  getMenu,
  logoutRequest,
  getUserInfo,
  getUserList,
};
const Apis = {
  loginRequest,
  registerRequest,
  getMenu,
  logoutRequest,
  getUserInfo,
  getUserList,
};
/**
 * 用于formConfig的api
 */
export type TApi = keyof typeof Apis;
const getApi = (api: TApi) => {
  return Apis[api];
};
export default getApi;
