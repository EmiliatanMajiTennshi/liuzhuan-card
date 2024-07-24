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
import { getHeatTreatmentFurnacePlatformsList } from "./getHeatTreatmentFurnacePlatformsList";
import { queryMaterialByItemid } from "./queryMaterialByItemid";
import { queryUnHalfTransferCard } from "./queryUnHalfTransferCard";
import { queryUnFlowCardInfoById } from "./queryUnFlowCardInfoById";
import { queryOutsourcingPurchasing } from "./queryOutsourcingPurchasing";
import { queryFlowCardInfoByOrderNo } from "./queryFlowCardInfoByOrderNo";
import { querySupplementaryOrder } from "./querySupplementaryOrder";
import { querySupplementaryOrderById } from "./querySupplementaryOrderById";
import { queryTransferCard } from "./queryTransferCard";
import { countProductType } from "./countProductType";
import { clickTransferCard } from "./clickTransferCard";
import { queryTestInfo } from "./queryTestInfo";
import { queryOperationInfo } from "./queryOperationInfo";
import { queryEquipmentInfo } from "./queryEquipmentInfo";
import { insertSaveTransferCard } from "./insertSaveTransferCard";
import { queryProcessByItemId } from "./queryProcessByItemId";
import { queryTransferStore } from "./queryTransferStore";
export {
  countProductType,
  clickTransferCard,
  deleteUsers,
  deleteRoleInfoByRoleId,
  deleteMenuById,
  getMenu,
  getUserInfo,
  getUserList,
  getHeatTreatmentFurnacePlatformsList,
  insertUser,
  insertRole,
  insertMenu,
  insertSaveTransferCard,
  loginRequest,
  logoutRequest,
  registerRequest,
  queryPermission,
  queryAllMenu,
  queryRole,
  queryHalfTransferCard,
  queryFlowCardInfoById,
  queryUnFlowCardInfoById,
  queryUnHalfTransferCard,
  queryMaterialByItemid,
  queryOutsourcingPurchasing,
  queryFlowCardInfoByOrderNo,
  querySupplementaryOrder,
  querySupplementaryOrderById,
  queryTransferCard,
  queryTestInfo,
  queryOperationInfo,
  queryEquipmentInfo,
  queryProcessByItemId,
  queryTransferStore,
  updateUser,
  updateRoleInfoPermission,
  updateMenuById,
};
const apis = {
  countProductType,
  clickTransferCard,
  deleteUsers,
  deleteRoleInfoByRoleId,
  deleteMenuById,
  getMenu,
  getUserInfo,
  getUserList,
  getHeatTreatmentFurnacePlatformsList,
  insertUser,
  insertRole,
  insertMenu,
  insertSaveTransferCard,
  loginRequest,
  logoutRequest,
  registerRequest,
  queryPermission,
  queryAllMenu,
  queryRole,
  queryHalfTransferCard,
  queryUnHalfTransferCard,
  queryFlowCardInfoById,
  queryUnFlowCardInfoById,
  queryMaterialByItemid,
  queryOutsourcingPurchasing,
  queryFlowCardInfoByOrderNo,
  querySupplementaryOrder,
  querySupplementaryOrderById,
  queryTransferCard,
  queryTestInfo,
  queryOperationInfo,
  queryEquipmentInfo,
  queryProcessByItemId,
  queryTransferStore,
  updateUser,
  updateRoleInfoPermission,
  updateMenuById,
};
/**
 * 用于formConfig的api
 */
export type TApi = keyof typeof apis;

/**
 * 获取接口
 * @param api
 * @returns
 */
const getApi = (api: TApi) => {
  return apis[api];
};
export default getApi;
