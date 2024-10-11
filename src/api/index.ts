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
import { queryOutsourcedPurchasedCheck } from "./queryOutsourcedPurchasedCheck";
import { queryRework } from "./queryRework";
import { queryHeatTreatment } from "./queryHeatTreatment";
import { updateHeatTreatmentStatus } from "./updateHeatTreatmentStatus";
import { queryFurnaceChange } from "./queryFurnaceChange";
import { queryRawMaterial } from "./queryRawMaterial";
import { queryUnfinishCard } from "./queryUnfinishCard";
import { queryUnfinishCardToStore } from "./queryUnfinishCardToStore";
import { queryQR } from "./queryQR";
import { insertRework } from "./insertRework";
import { queryReworkInfoById } from "./queryReworkInfoById";
import { deletePermissionById } from "./deletePermissionById";
import { insertPermission } from "./insertPermission";
import { updatePermissionById } from "./updatePermissionById";
import { updateReworkDetailById } from "./updateReworkDetailById";
import { updateReworkInfoById } from "./updateReworkInfoById";
import { insertSaveTransferCardDetail } from "./insertSaveTransferCardDetail";
import { changeFurnacePlatformById } from "./changeFurnacePlatformById";
import { countOrderCompletionStatus } from "./countOrderCompletionStatus";
import { queryReviewFormNumber } from "./queryReviewFormNumber";
import { queryProcess } from "./queryProcess";
import { updateCheckById } from "./udpateCheckById";
import { printSaveCard } from "./printSaveCard";
import { updatePrintStatus } from "./updatePrintStatus";
import { updateHeatTreatmentPrintStatus } from "./updateHeatTreatmentPrintStatus";
import { queryReformInfoByItemId } from "./queryReformInfoByItemId";
import { countUnfinishTransferToStore } from "./countUnfinishTransferToStore";
import { getUnfinishedProducts } from "./getUnfinishedProducts";
import { getFinishedProducts } from "./getFinishedProducts";
import { getOutsourcingPurchasing } from "./getOutsourcingPurchasing";
import { getSupplement } from "./getSupplement";
import { queryTransferCardNew } from "./queryTransferCardNew";
import { queryTransferCardToStoreNew } from "./queryTransferCardToStoreNew";
import { queryQualityInspectionNew } from "./queryQualityInspectionNew";
import { queryLogisticsNew } from "./queryLogisticsNew";
import { queryReworkTransferCardNew } from "./queryReworkTransferCardNew";
import { queryProcessUnfinishToStoreNew } from "./queryProcessUnfinishToStoreNew";
import { queryOutSourceCheckNew } from "./queryOutSourceCheckNew";
import { queryFurnaceChangeNew } from "./queryFurnaceChangeNew";
import { queryProcessUnfinishNew } from "./queryProcessUnfinishNew";
import { queryfinishedProductsByOI } from "./queryfinishedProductsByOI";
import { queryUnfinishedProductsByOI } from "./queryUnfinishedProductsByOI";
import { queryoutsourcingPurchasingByOI } from "./queryoutsourcingPurchasingByOI";
import { supplementByOI } from "./supplementByOI";
import { queryReworkTransferCardByIdNew } from "./queryReworkTransferCardByIdNew";
import { insertUnfinishedProductsNew } from "./insertUnfinishedProductsNew";
import { insertfinishedProductsNew } from "./insertfinishedProductsNew";
import { insertoutsourcingPurchasingNew } from "./insertoutsourcingPurchasing";
import { queryTransferCardInfoByCardIdNew } from "./queryTransferCardInfoByCardIdNew";
import { insertFurnaceChange } from "./insertFurnaceChange";
import { updateTransferCardInfoByCardId } from "./updateTransferCardInfoByCardId";
import { updateFTransferCardInfoByCardId } from "./updateFTransferCardInfoByCardId";
import { updateOTransferCardInfoByCardId } from "./updateOTransferCardInfoByCardId";
import { insertDeliveryNew } from "./insertDeliveryNew";
import { insertReworkTransferCardNew } from "./insertReworkTransferCardNew";
import { updateReworkTransferCardById } from "./updateReworkTransferCardById";
import { insertPrintTransferCardNew } from "./insertPrintTransferCardNew";
import { printReworkTransferCardNew } from "./printReworkTransferCard";
import { queryPartNumberByHalf } from "./queryPartNumberByHalf";
import { queryStandPartNumberByHalf } from "./queryStandPartNumberByHalf";
import { countProcessUnfinishToStore } from "./countProcessUnfinishToStoreNew";
import { queryOrderCount } from "./queryOrderCount";
import { querytransferCardRelation } from "./querytransferCardRelationNew";
import { queryFurnaceByTraceabilityHalf } from "./queryFurnaceByTraceabilityHalfNew";

export {
  countProductType,
  countOrderCompletionStatus,
  clickTransferCard,
  countUnfinishTransferToStore,
  changeFurnacePlatformById,
  deleteUsers,
  deleteRoleInfoByRoleId,
  deleteMenuById,
  deletePermissionById,
  getMenu,
  getUserInfo,
  getUserList,
  getHeatTreatmentFurnacePlatformsList,
  insertUser,
  insertRole,
  insertMenu,
  insertSaveTransferCard,
  insertSaveTransferCardDetail,
  insertRework,
  insertPermission,
  loginRequest,
  logoutRequest,
  registerRequest,
  printSaveCard,
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
  queryOutsourcedPurchasedCheck,
  queryRework,
  queryHeatTreatment,
  queryFurnaceChange,
  queryRawMaterial,
  queryUnfinishCard,
  queryUnfinishCardToStore,
  queryQR,
  queryReworkInfoById,
  queryReviewFormNumber,
  queryProcess,
  queryReformInfoByItemId,
  updateUser,
  updateRoleInfoPermission,
  updateMenuById,
  updateHeatTreatmentStatus,
  updatePermissionById,
  updateReworkDetailById,
  updateReworkInfoById,
  updateCheckById,
  updatePrintStatus,
  updateHeatTreatmentPrintStatus,
};

const apisOld = {
  countProductType,
  countOrderCompletionStatus,
  countUnfinishTransferToStore,
  clickTransferCard,
  changeFurnacePlatformById,
  deleteUsers,
  deleteRoleInfoByRoleId,
  deleteMenuById,
  deletePermissionById,
  getMenu,
  getUserInfo,
  getUserList,
  getHeatTreatmentFurnacePlatformsList,
  insertUser,
  insertRole,
  insertMenu,
  insertRework,
  insertPermission,
  insertSaveTransferCard,
  insertSaveTransferCardDetail,
  loginRequest,
  logoutRequest,
  registerRequest,
  printSaveCard,
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
  queryOutsourcedPurchasedCheck,
  queryRework,
  queryHeatTreatment,
  queryFurnaceChange,
  queryRawMaterial,
  queryUnfinishCard,
  queryUnfinishCardToStore,
  queryQR,
  queryReworkInfoById,
  queryReviewFormNumber,
  queryProcess,
  queryReformInfoByItemId,
  updateUser,
  updateRoleInfoPermission,
  updateMenuById,
  updateHeatTreatmentStatus,
  updatePermissionById,
  updateReworkDetailById,
  updateReworkInfoById,
  updateCheckById,
  updatePrintStatus,
  updateHeatTreatmentPrintStatus,
};

export {
  countProcessUnfinishToStore,
  getUnfinishedProducts,
  getFinishedProducts,
  getOutsourcingPurchasing,
  getSupplement,
  printReworkTransferCardNew,
  queryTransferCardNew,
  queryTransferCardToStoreNew,
  queryQualityInspectionNew,
  queryLogisticsNew,
  queryReworkTransferCardNew,
  queryProcessUnfinishToStoreNew,
  queryOutSourceCheckNew,
  queryFurnaceChangeNew,
  queryProcessUnfinishNew,
  queryfinishedProductsByOI,
  queryUnfinishedProductsByOI,
  queryoutsourcingPurchasingByOI,
  queryReworkTransferCardByIdNew,
  queryTransferCardInfoByCardIdNew,
  queryPartNumberByHalf,
  queryStandPartNumberByHalf,
  queryOrderCount,
  querytransferCardRelation,
  queryFurnaceByTraceabilityHalf,
  supplementByOI,
  insertUnfinishedProductsNew,
  insertfinishedProductsNew,
  insertoutsourcingPurchasingNew,
  insertFurnaceChange,
  insertReworkTransferCardNew,
  insertDeliveryNew,
  insertPrintTransferCardNew,
  updateTransferCardInfoByCardId,
  updateFTransferCardInfoByCardId,
  updateOTransferCardInfoByCardId,
  updateReworkTransferCardById,
};
const apisNew = {
  countProcessUnfinishToStore,
  getUnfinishedProducts,
  getFinishedProducts,
  getOutsourcingPurchasing,
  getSupplement,
  printReworkTransferCardNew,
  queryTransferCardNew,
  queryTransferCardToStoreNew,
  queryQualityInspectionNew,
  queryLogisticsNew,
  queryReworkTransferCardNew,
  queryProcessUnfinishToStoreNew,
  queryOutSourceCheckNew,
  queryFurnaceChangeNew,
  queryProcessUnfinishNew,
  queryfinishedProductsByOI,
  queryUnfinishedProductsByOI,
  queryoutsourcingPurchasingByOI,
  queryReworkTransferCardByIdNew,
  queryTransferCardInfoByCardIdNew,
  queryPartNumberByHalf,
  queryStandPartNumberByHalf,
  queryOrderCount,
  querytransferCardRelation,
  queryFurnaceByTraceabilityHalf,
  supplementByOI,
  insertUnfinishedProductsNew,
  insertfinishedProductsNew,
  insertoutsourcingPurchasingNew,
  insertFurnaceChange,
  insertReworkTransferCardNew,
  insertDeliveryNew,
  insertPrintTransferCardNew,
  updateTransferCardInfoByCardId,
  updateFTransferCardInfoByCardId,
  updateOTransferCardInfoByCardId,
  updateReworkTransferCardById,
};

const apis = {
  ...apisOld,
  ...apisNew,
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
