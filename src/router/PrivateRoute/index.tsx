import React, { useState } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { AuthRoute } from "@/components/AuthRoute";
import { IMenuItem } from "@/constants/constantsType";
import { AnyObject } from "antd/es/_util/type";
import { MENULIST } from "@/constants/constants";
import { useRootStore } from "@/store";
import { observer } from "mobx-react-lite";
// import { Home } from "../../pages/Home";
// import { Login } from "@/pages/Login";
// import { AddPartFlowCard } from "@/pages/AddPartFlowCard";
// import { AddAssemblyFlowCard } from "@/pages/AddAssemblyFlowCard";
// import { FlowCardQuery } from "@/pages/FlowCardQuery";
// import { OperatorSimpleTask } from "@/pages/OperatorSimpleTask";
// import { FlowCardCancel } from "@/pages/FlowCardCancel";
// import { AddEmployeeInfo } from "@/pages/AddEmployeeInfo";
// import { FullInspectionDefectRate } from "@/pages/FullInspectionDefectRate";
// import { IssueSemiFinishedPartFlowCard } from "@/pages/IssueSemiFinishedPartFlowCard";
// import { IssueRollerNestSemiFinishedPartFlowCard } from "@/pages/IssueRollerNestSemiFinishedPartFlowCard";
// import { NoStandardProductTransferCard } from "@/pages/NoStandardProductTransferCard";
// import { IssueOutsourcingFlowCard } from "@/pages/IssueOutsourcingFlowCard";
// import { IssueReplenishmentOrderFlowCard } from "@/pages/IssueReplenishmentOrderFlowCard";
// import { PartFlowCardQuery } from "@/pages/PartFlowCardQuery";
// import { ProductionProcessFlowCardAndDispatchList } from "@/pages/ProductionProcessFlowCardAndDispatchList";
// import { PartFlowCardPrint } from "@/pages/PartFlowCardPrint";

// 懒加载
const Login = React.lazy(() =>
  import("@/pages/Login").then((res) => ({ default: res.Login }))
);
const Home = React.lazy(() =>
  import("@/pages/Home").then((res) => ({ default: res.Home }))
);

const AddAssemblyFlowCard = React.lazy(() =>
  import("@/pages/AddAssemblyFlowCard").then((res) => ({
    default: res.AddAssemblyFlowCard,
  }))
);

const OperatorSimpleTask = React.lazy(() =>
  import("@/pages/OperatorSimpleTask").then((res) => ({
    default: res.OperatorSimpleTask,
  }))
);

const AddEmployeeInfo = React.lazy(() =>
  import("@/pages/AddEmployeeInfo").then((res) => ({
    default: res.AddEmployeeInfo,
  }))
);
const FullInspectionDefectRate = React.lazy(() =>
  import("@/pages/FullInspectionDefectRate").then((res) => ({
    default: res.FullInspectionDefectRate,
  }))
);

/**标准品流转卡下发 */
const StandardProductTransferCard = React.lazy(() =>
  import("@/pages/StandardProductTransferCard").then((res) => ({
    default: res.StandardProductTransferCard,
  }))
);

/**非标准品流转卡下发 */
const NoStandardProductTransferCard = React.lazy(() =>
  import("@/pages/NoStandardProductTransferCard").then((res) => ({
    default: res.NoStandardProductTransferCard,
  }))
);

const PartFlowCardQuery = React.lazy(() =>
  import("@/pages/PartFlowCardQuery").then((res) => ({
    default: res.PartFlowCardQuery,
  }))
);
// const ProductionProcessFlowCardAndDispatchList = React.lazy(() =>
//   import("@/pages/ProductionProcessFlowCardAndDispatchList").then((res) => ({
//     default: res.ProductionProcessFlowCardAndDispatchList,
//   }))
// );
// const PartFlowCardPrint = React.lazy(() =>
//   import("@/pages/PartFlowCardPrint").then((res) => ({
//     default: res.PartFlowCardPrint,
//   }))
// );
const OrderCompletionStatus = React.lazy(() =>
  import("@/pages/OrderCompletionStatus").then((res) => ({
    default: res.OrderCompletionStatus,
  }))
);
const FlowCardStorageInfo = React.lazy(() =>
  import("@/pages/FlowCardStorageInfo").then((res) => ({
    default: res.FlowCardStorageInfo,
  }))
);
const MaterialReworkProcessCard = React.lazy(() =>
  import("@/pages/MaterialReworkProcessCard").then((res) => ({
    default: res.MaterialReworkProcessCard,
  }))
);

const QualityInspectionOutsourcingInspection = React.lazy(() =>
  import("@/pages/QualityInspectionOutsourcingInspection").then((res) => ({
    default: res.QualityInspectionOutsourcingInspection,
  }))
);

const UpdateDeburringRoundingFurnace = React.lazy(() =>
  import("@/pages/UpdateDeburringRoundingFurnace").then((res) => ({
    default: res.UpdateDeburringRoundingFurnace,
  }))
);

const QueryProcessIncomplete = React.lazy(() =>
  import("@/pages/QueryProcessIncomplete").then((res) => ({
    default: res.QueryProcessIncomplete,
  }))
);
const AddEmployeeInfoChain = React.lazy(() =>
  import("@/pages/AddEmployeeInfoChain").then((res) => ({
    default: res.AddEmployeeInfoChain,
  }))
);
/**首页 */
const Dashboard = React.lazy(() =>
  import("@/pages/Dashboard").then((res) => ({
    default: res.Dashboard,
  }))
);
/**用户管理 */
const UserManage = React.lazy(() =>
  import("@/pages/UserManage").then((res) => ({
    default: res.UserManage,
  }))
);

/**角色管理 */
const RoleManage = React.lazy(() =>
  import("@/pages/RoleManage").then((res) => ({
    default: res.RoleManage,
  }))
);

/**菜单管理 */
const MenuManage = React.lazy(() =>
  import("@/pages/MenuManage").then((res) => ({
    default: res.MenuManage,
  }))
);
/**权限管理 */
const PermissionManage = React.lazy(() =>
  import("@/pages/PermissionManage").then((res) => ({
    default: res.PermissionManage,
  }))
);

/**外协外购流转卡下发*/
const OutsourcingProductTransferCard = React.lazy(() =>
  import("@/pages/OutsourcingProductTransferCard").then((res) => ({
    default: res.OutsourcingProductTransferCard,
  }))
);
/**补单流转卡下发 */
const SupplementaryProductTransferCard = React.lazy(() =>
  import("@/pages/SupplementaryProductTransferCard").then((res) => ({
    default: res.SupplementaryProductTransferCard,
  }))
);
/**零件流转卡管理 */
const QueryProductTransferCard = React.lazy(() =>
  import("@/pages/QueryProductTransferCard").then((res) => ({
    default: res.QueryProductTransferCard,
  }))
);
/**订单完成情况统计 */
const CountOrder = React.lazy(() =>
  import("@/pages/CountOrder").then((res) => ({
    default: res.CountOrder,
  }))
);
/**流转卡入库信息查询 */
const QueryStoreTransferCard = React.lazy(() =>
  import("@/pages/QueryStoreTransferCard").then((res) => ({
    default: res.QueryStoreTransferCard,
  }))
);
/**外协外购报检及检查 */
const OutsourcedPurchasedInspectionTesting = React.lazy(() =>
  import("@/pages/OutsourcedPurchasedInspectionTesting").then((res) => ({
    default: res.OutsourcedPurchasedInspectionTesting,
  }))
);
/**返工流转卡管理 */
const ReworkTransferCard = React.lazy(() =>
  import("@/pages/ReworkTransferCard").then((res) => ({
    default: res.ReworkTransferCard,
  }))
);
/**甩毛刺-甩圆角-炉台变更 */
const ChangeFurnaceTable = React.lazy(() =>
  import("@/pages/ChangeFurnaceTable").then((res) => ({
    default: res.ChangeFurnaceTable,
  }))
);
/**生料库存查询 */
const QueryRawMaterial = React.lazy(() =>
  import("@/pages/QueryRawMaterial").then((res) => ({
    default: res.QueryRawMaterial,
  }))
);
/**流转卡工序未完成(未完成) */
const TransferCardUnfinish = React.lazy(() =>
  import("@/pages/TransferCardUnfinish").then((res) => ({
    default: res.TransferCardUnfinish,
  }))
);
/**流转卡工序未完成(已完成) */
const TransferCardUnfinishToStore = React.lazy(() =>
  import("@/pages/TransferCardUnfinishToStore").then((res) => ({
    default: res.TransferCardUnfinishToStore,
  }))
);
/**	外购外协已检查询 */
const OutsourcedPurchasedCheckedQuery = React.lazy(() =>
  import("@/pages/OutsourcedPurchasedCheckedQuery").then((res) => ({
    default: res.OutsourcedPurchasedCheckedQuery,
  }))
);
/**热处理炉台作业查询 */
const HeatTreatmentFurnaceOperationQuery = React.lazy(() =>
  import("@/pages/HeatTreatmentFurnaceOperationQuery").then((res) => ({
    default: res.HeatTreatmentFurnaceOperationQuery,
  }))
);
/**物流-热处理配料查询 */
const LogisticsHeatTreatmentIngredients = React.lazy(() =>
  import("@/pages/LogisticsHeatTreatmentIngredients").then((res) => ({
    default: res.LogisticsHeatTreatmentIngredients,
  }))
);

///////////////////////////// new //////////////////////////////////

/**半品流转卡下发 */
const UnfinishedProductsTransferCard = React.lazy(() =>
  import("@/pages/UnfinishedProductsTransferCard").then((res) => ({
    default: res.UnfinishedProductsTransferCard,
  }))
);
/**成品流转卡下发 */
const FinishedProductsTransferCard = React.lazy(() =>
  import("@/pages/FinishedProductsTransferCard").then((res) => ({
    default: res.FinishedProductsTransferCard,
  }))
);
/**半品下发成品 */
const UnfinishedIssueFinished = React.lazy(() =>
  import("@/pages/UnfinishedIssueFinished").then((res) => ({
    default: res.UnfinishedIssueFinished,
  }))
);
/**半品同时打印成品 */
const UnfinishedAndFinishedPrintTogether = React.lazy(() =>
  import("@/pages/UnfinishedAndFinishedPrintTogether").then((res) => ({
    default: res.UnfinishedAndFinishedPrintTogether,
  }))
);
/**零件流转卡打印 */
const PrintProductTransferCard = React.lazy(() =>
  import("@/pages/PrintProductTransferCard").then((res) => ({
    default: res.PrintProductTransferCard,
  }))
);
/**多工艺流转管理 */
const MutiProcessTransfer = React.lazy(() =>
  import("@/pages/MutiProcessTransfer").then((res) => ({
    default: res.MutiProcessTransfer,
  }))
);
/**多工艺流转查询 */
const MutiProcessTransferQuery = React.lazy(() =>
  import("@/pages/MultiProcessTransferQuery").then((res) => ({
    default: res.MutiProcessTransferQuery,
  }))
);
/**车间卷装链条 */
const QueryRollChain = React.lazy(() =>
  import("@/pages/QueryRollChain").then((res) => ({
    default: res.QueryRollChain,
  }))
);
/**申诉 */
const AppealInfoPage = React.lazy(() =>
  import("@/pages/AppealInfoPage").then((res) => ({
    default: res.AppealInfoPage,
  }))
);
/**跳转事业部看板 */
const GoToDepartmentDashboard = React.lazy(() =>
  import("@/pages/GoToDepartmentDashboard").then((res) => ({
    default: res.GoToDepartmentDashboard,
  }))
);
/**统计明细 */
const StatisticalDetails = React.lazy(() =>
  import("@/pages/StatisticalDetails").then((res) => ({
    default: res.StatisticalDetails,
  }))
);
/**外购半品下发成品 */
const OutsourcingIssueTogether = React.lazy(() =>
  import("@/pages/OutsourcingIssueTogether").then((res) => ({
    default: res.OutsourcingIssueTogether,
  }))
);
/**外购半品同时打印成品 */
const OutsourcingPrintTogether = React.lazy(() =>
  import("@/pages/OutsourcingPrintTogether").then((res) => ({
    default: res.OutsourcingPrintTogether,
  }))
);
/**外购半品同时打印成品 */
const HeatTreatmentStock = React.lazy(() =>
  import("@/pages/HeatTreatmentStock").then((res) => ({
    default: res.HeatTreatmentStock,
  }))
);
/**成品拆分 */
const SplitFinishedCard = React.lazy(() =>
  import("@/pages/SplitFinishedCard").then((res) => ({
    default: res.SplitFinishedCard,
  }))
);
/**成品同时打印外购半品 */
const UnfinishedPrintOutsourcing = React.lazy(() =>
  import("@/pages/UnfinishedPrintOutsourcing").then((res) => ({
    default: res.UnfinishedPrintOutsourcing,
  }))
);

/**路由 */
const routeMap = [
  {
    path: "/add_assembly_flow_card",
    element: <AddAssemblyFlowCard />,
  },

  {
    path: "/operator_simple_task",
    element: <OperatorSimpleTask />,
  },

  {
    path: "/add_employee_info",
    element: <AddEmployeeInfo />,
  },
  {
    path: "/full_inspection_defect_rate",
    element: <FullInspectionDefectRate />,
  },
  {
    path: "/unfinished_products_transfer_card",
    element: <UnfinishedProductsTransferCard />,
  },

  {
    path: "/finished_products_transfer_card",
    element: <FinishedProductsTransferCard />,
  },

  {
    path: "/part_flow_card_query",
    element: <PartFlowCardQuery />,
  },

  // {
  //   path: "/part_flow_card_print",
  //   element: <PartFlowCardPrint />,
  // },
  {
    path: "/order_completion_status",
    element: <OrderCompletionStatus />,
  },
  {
    path: "/flow_card_storage_info",
    element: <FlowCardStorageInfo />,
  },
  {
    path: "/flow_card_storage_info",
    element: <OrderCompletionStatus />,
  },
  {
    path: "/material_rework_process_card",
    element: <MaterialReworkProcessCard />,
  },

  {
    path: "/logistics_heat_treatment_ingredients",
    element: <LogisticsHeatTreatmentIngredients />,
  },
  {
    path: "/quality_inspection_outsourcing_inspection",
    element: <QualityInspectionOutsourcingInspection />,
  },
  {
    path: "/heat_treatment_furnace_operation_query",
    element: <HeatTreatmentFurnaceOperationQuery />,
  },
  {
    path: "/update_deburring_rounding_furnace",
    element: <UpdateDeburringRoundingFurnace />,
  },

  {
    path: "/query_process_incomplete",
    element: <QueryProcessIncomplete />,
  },
  {
    path: "/add_employee_info_chain",
    element: <AddEmployeeInfoChain />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  { path: "/user_manage", element: <UserManage /> },
  { path: "/role_manage", element: <RoleManage /> },
  { path: "/menu_manage", element: <MenuManage /> },
  { path: "/permission_manage", element: <PermissionManage /> },
  {
    path: "/outsourcing_product_transfer_card",
    element: <OutsourcingProductTransferCard />,
  },
  {
    path: "/supplementary_product_transfer_card",
    element: <SupplementaryProductTransferCard />,
  },
  {
    path: "/query_product_transfer_card",
    element: <QueryProductTransferCard />,
  },
  {
    path: "/count_order",
    element: <CountOrder />,
  },
  {
    path: "/query_store_transfer_card",
    element: <QueryStoreTransferCard />,
  },
  {
    path: "/outsourced_purchased_inspection_testing",
    element: <OutsourcedPurchasedInspectionTesting />,
  },
  {
    path: "/rework_transfer_card",
    element: <ReworkTransferCard />,
  },
  {
    path: "/change_furnace_table",
    element: <ChangeFurnaceTable />,
  },
  {
    path: "/query_raw_material",
    element: <QueryRawMaterial />,
  },
  {
    path: "/transfer_card_unfinish",
    element: <TransferCardUnfinish />,
  },
  {
    path: "/transfer_card_unfinish_to_store",
    element: <TransferCardUnfinishToStore />,
  },
  {
    path: "/outsourced_purchased_checked_query",
    element: <OutsourcedPurchasedCheckedQuery />,
  },
  {
    path: "/unfinished_issue_finished",
    element: <UnfinishedIssueFinished />,
  },
  {
    path: "/unfinished_and_finished_print_together",
    element: <UnfinishedAndFinishedPrintTogether />,
  },
  {
    path: "/print_product_transfer_card",
    element: <PrintProductTransferCard />,
  },
  {
    path: "/multi_process_transfer",
    element: <MutiProcessTransfer />,
  },
  {
    path: "/multi_process_transfer_query",
    element: <MutiProcessTransferQuery />,
  },
  {
    path: "/query_roll_chain",
    element: <QueryRollChain />,
  },
  {
    path: "/department_dashboard",
    element: <GoToDepartmentDashboard />,
  },
  {
    path: "/statistical_details",
    element: <StatisticalDetails />,
  },
  {
    path: "/outsourcing_issue_together",
    element: <OutsourcingIssueTogether />,
  },
  {
    path: "/outsourcing_print_together",
    element: <OutsourcingPrintTogether />,
  },
  {
    path: "/heat_treatment_stock",
    element: <HeatTreatmentStock />,
  },
  {
    path: "/split_finished_card",
    element: <SplitFinishedCard />,
  },
  {
    path: "/unfinished_print_outsourcing",
    element: <UnfinishedPrintOutsourcing />,
  },
];

// 转成对象
const routeMapObj = routeMap.reduce((acc: AnyObject, route) => {
  acc[route.path] = route;
  return acc;
}, {});

/** 路由组件*/
const PrivateRoute = () => {
  const storeMenu = useRootStore().menu.menu;
  const menu =
    storeMenu.length === 0
      ? JSON.parse(localStorage.getItem(MENULIST) || "[]")
      : storeMenu;
  let dashboardFlag = false;
  const childrenArr: IMenuItem[] = [];
  const findAllChildren = (menu: IMenuItem[]) => {
    menu.forEach((item) => {
      if (item?.key === "/dashboard") {
        dashboardFlag = true;
      }
      if (routeMapObj[item.key]) {
        childrenArr.push(routeMapObj[item.key]);
      }
      if (item?.children) {
        findAllChildren(item.children);
      }
    });
    return childrenArr;
  };

  const children = findAllChildren(menu) || [];

  const routeConfig = [
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/",
      element: (
        <AuthRoute dashboardFlag={dashboardFlag}>
          <Home />
        </AuthRoute>
      ),
      children: [
        ...children,
        {
          path: "/404",
          element: "404 Not Found",
        },
        {
          path: "appeal_info_page",
          element: <AppealInfoPage />,
        },
        {
          path: "statistical_details",
          element: <StatisticalDetails />,
        },
        {
          path: "heat_treatment_stock",
          element: <HeatTreatmentStock />,
        },
        {
          path: "*",
          element: "404 Not Found",
        },
      ],
    },
  ];

  return useRoutes(routeConfig);
};

export default observer(PrivateRoute);
