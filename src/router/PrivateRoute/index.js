import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import AuthRoute from "@/components/AuthRoute/AuthRoute";
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
// import { IssueFinishedPartFlowCard } from "@/pages/IssueFinishedPartFlowCard";
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
const AddPartFlowCard = React.lazy(() =>
  import("@/pages/AddPartFlowCard").then((res) => ({
    default: res.AddPartFlowCard,
  }))
);
const AddAssemblyFlowCard = React.lazy(() =>
  import("@/pages/AddAssemblyFlowCard").then((res) => ({
    default: res.AddAssemblyFlowCard,
  }))
);
const FlowCardQuery = React.lazy(() =>
  import("@/pages/FlowCardQuery").then((res) => ({
    default: res.FlowCardQuery,
  }))
);
const OperatorSimpleTask = React.lazy(() =>
  import("@/pages/OperatorSimpleTask").then((res) => ({
    default: res.OperatorSimpleTask,
  }))
);
const FlowCardCancel = React.lazy(() =>
  import("@/pages/FlowCardCancel").then((res) => ({
    default: res.FlowCardCancel,
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
const IssueChainBoardSemiFinishedPartFlowCard = React.lazy(() =>
  import("@/pages/IssueChainBoardSemiFinishedPartFlowCard").then((res) => ({
    default: res.IssueChainBoardSemiFinishedPartFlowCard,
  }))
);
const IssueRollerNestSemiFinishedPartFlowCard = React.lazy(() =>
  import("@/pages/IssueRollerNestSemiFinishedPartFlowCard").then((res) => ({
    default: res.IssueRollerNestSemiFinishedPartFlowCard,
  }))
);
const IssueFinishedPartFlowCard = React.lazy(() =>
  import("@/pages/IssueFinishedPartFlowCard").then((res) => ({
    default: res.IssueFinishedPartFlowCard,
  }))
);
const IssueOutsourcingFlowCard = React.lazy(() =>
  import("@/pages/IssueOutsourcingFlowCard").then((res) => ({
    default: res.IssueOutsourcingFlowCard,
  }))
);
const IssueReplenishmentOrderFlowCard = React.lazy(() =>
  import("@/pages/IssueReplenishmentOrderFlowCard").then((res) => ({
    default: res.IssueReplenishmentOrderFlowCard,
  }))
);
const PartFlowCardQuery = React.lazy(() =>
  import("@/pages/PartFlowCardQuery").then((res) => ({
    default: res.PartFlowCardQuery,
  }))
);
const ProductionProcessFlowCardAndDispatchList = React.lazy(() =>
  import("@/pages/ProductionProcessFlowCardAndDispatchList").then((res) => ({
    default: res.ProductionProcessFlowCardAndDispatchList,
  }))
);
const PartFlowCardPrint = React.lazy(() =>
  import("@/pages/PartFlowCardPrint").then((res) => ({
    default: res.PartFlowCardPrint,
  }))
);
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
const HeavyIndustryProcessCard = React.lazy(() =>
  import("@/pages/HeavyIndustryProcessCard").then((res) => ({
    default: res.HeavyIndustryProcessCard,
  }))
);
const LogisticsHeatTreatmentIngredients = React.lazy(() =>
  import("@/pages/LogisticsHeatTreatmentIngredients").then((res) => ({
    default: res.LogisticsHeatTreatmentIngredients,
  }))
);
const QualityInspectionOutsourcingInspection = React.lazy(() =>
  import("@/pages/QualityInspectionOutsourcingInspection").then((res) => ({
    default: res.QualityInspectionOutsourcingInspection,
  }))
);
const HeatTreatmentFurnaceOperation = React.lazy(() =>
  import("@/pages/HeatTreatmentFurnaceOperation").then((res) => ({
    default: res.HeatTreatmentFurnaceOperation,
  }))
);
const UpdateDeburringRoundingFurnace = React.lazy(() =>
  import("@/pages/UpdateDeburringRoundingFurnace").then((res) => ({
    default: res.UpdateDeburringRoundingFurnace,
  }))
);
const QueryRawMaterialInventoryInquiry = React.lazy(() =>
  import("@/pages/QueryRawMaterialInventoryInquiry").then((res) => ({
    default: res.QueryRawMaterialInventoryInquiry,
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
const routeMap = [
  {
    path: "/add_part_flow_card",
    element: <AddPartFlowCard />,
  },
  {
    path: "/add_assembly_flow_card",
    element: <AddAssemblyFlowCard />,
  },
  {
    path: "/flow_card_query",
    element: <FlowCardQuery />,
  },
  {
    path: "/operator_simple_task",
    element: <OperatorSimpleTask />,
  },
  {
    path: "/flow_card_cancel",
    element: <FlowCardCancel />,
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
    path: "/issue_chain_board_semi_finished_part_flow_card",
    element: <IssueChainBoardSemiFinishedPartFlowCard />,
  },
  {
    path: "/issue_rollernest_semi_finished_part_flow_card",
    element: <IssueRollerNestSemiFinishedPartFlowCard />,
  },
  {
    path: "/issue_finished_part_flow_card",
    element: <IssueFinishedPartFlowCard />,
  },
  {
    path: "/issue_outsourcing_flow_card",
    element: <IssueOutsourcingFlowCard />,
  },
  {
    path: "/issue_replenishment_order_flow_card",
    element: <IssueReplenishmentOrderFlowCard />,
  },
  {
    path: "/part_flow_card_query",
    element: <PartFlowCardQuery />,
  },
  {
    path: "/production_process_flow_card_and_dispatch_list",
    element: <ProductionProcessFlowCardAndDispatchList />,
  },
  {
    path: "/part_flow_card_print",
    element: <PartFlowCardPrint />,
  },
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
    path: "/heavy_industry_process_card",
    element: <HeavyIndustryProcessCard />,
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
    path: "/heat_treatment_furnace_operation",
    element: <HeatTreatmentFurnaceOperation />,
  },
  {
    path: "/update_deburring_rounding_furnace",
    element: <UpdateDeburringRoundingFurnace />,
  },
  {
    path: "/query_raw_material_inventory_inquiry",
    element: <QueryRawMaterialInventoryInquiry />,
  },
  {
    path: "/query_process_incomplete",
    element: <QueryProcessIncomplete />,
  },
  {
    path: "/add_employee_info_chain",
    element: <AddEmployeeInfoChain />,
  },
];
const PrivateRoute = () => {
  const menu = JSON.parse(localStorage.getItem("menuList") || "[]");
  console.log(menu);

  const childrenArr = [];
  const findAllChildren = (menu) => {
    menu.forEach((item) => {
      routeMap.forEach((routeItem) => {
        try {
          if (routeItem.path === item.key) {
            childrenArr.push(routeItem);

            throw new Error("这不是错误，只是用来中止循环");
          }
        } catch {}
      });
      if (item?.children) {
        findAllChildren(item?.children);
      }
    });
    return childrenArr;
  };
  const children = findAllChildren(menu) || [];
  console.log(children, 11, menu);
  const routeConfig = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <AuthRoute>
          <Home />
        </AuthRoute>
      ),
      children,
    },
    {
      path: "*",
      element: <Navigate to={"/404"} />,
    },
    {
      path: "/404",
      element: "404 Not Found",
    },
  ];
  console.log(routeConfig, 123);
  const test = useRoutes(routeConfig);

  return test;
};

export default PrivateRoute;
