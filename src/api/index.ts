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
import { queryHalfTransferCard } from "./queryHalfTransferCard";
import { queryFlowCardInfoById } from "./queryFlowCardInfoById";
import { updateMenuById } from "./updateMenuById";
import { deleteMenuById } from "./deleteMenuById";
import { insertMenu } from "./insertMenu";
export {
  deleteUsers,
  deleteRoleInfoByRoleId,
  deleteMenuById,
  getMenu,
  getUserInfo,
  getUserList,
  insertUser,
  insertRole,
  insertMenu,
  loginRequest,
  logoutRequest,
  registerRequest,
  queryPermission,
  queryAllMenu,
  queryRole,
  queryHalfTransferCard,
  queryFlowCardInfoById,
  updateUser,
  updateRoleInfoPermission,
  updateMenuById,
};
const Apis = {
  deleteUsers,
  deleteRoleInfoByRoleId,
  deleteMenuById,
  getMenu,
  getUserInfo,
  getUserList,
  insertUser,
  insertRole,
  insertMenu,
  loginRequest,
  logoutRequest,
  registerRequest,
  queryPermission,
  queryAllMenu,
  queryRole,
  queryHalfTransferCard,
  queryFlowCardInfoById,
  updateUser,
  updateRoleInfoPermission,
  updateMenuById,
};
/**
 * 用于formConfig的api
 */
export type TApi = keyof typeof Apis;

/**
 * 获取接口
 * @param api
 * @returns
 */
const getApi = (api: TApi) => {
  return Apis[api];
};
export default getApi;
