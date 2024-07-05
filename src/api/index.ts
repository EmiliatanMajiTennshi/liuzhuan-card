import { updateUser } from "./updateUser";
import { getUserList } from "./getUserList";
import { loginRequest } from "./loginRequest";
import { registerRequest } from "./registerRequest";
import { getMenu } from "./getMenu";
import { logoutRequest } from "./logoutRequest";
import { getUserInfo } from "./getUserInfo";
import { insertUser } from "./insertUser";
import { queryRole } from "./queryRole";
import { deleteUsers } from "./deleteUsers";
import { queryPermission } from "./queryPermission";
import { queryAllMenu } from "./queryAllMenu";
import { updateRoleInfoPermission } from "./updateRoleInfoPermission";
import { insertRole } from "./insertRole";
import { deleteRoleInfoByRoleId } from "./deleteRoleInfoByRoleId";
export {
  deleteUsers,
  deleteRoleInfoByRoleId,
  getMenu,
  getUserInfo,
  getUserList,
  insertUser,
  insertRole,
  loginRequest,
  logoutRequest,
  registerRequest,
  queryPermission,
  queryAllMenu,
  queryRole,
  updateUser,
  updateRoleInfoPermission,
};
const Apis = {
  deleteUsers,
  deleteRoleInfoByRoleId,
  getMenu,
  getUserInfo,
  getUserList,
  insertUser,
  insertRole,
  loginRequest,
  logoutRequest,
  registerRequest,
  queryPermission,
  queryAllMenu,
  queryRole,
  updateUser,
  updateRoleInfoPermission,
};
/**
 * 用于formConfig的api
 */
export type TApi = keyof typeof Apis;
const getApi = (api: TApi) => {
  return Apis[api];
};
export default getApi;
