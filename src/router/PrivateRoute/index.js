import React from "react";
import { useRoutes } from "react-router-dom";
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
// import { IssueChainboardsSemiFinishedPartFlowCard } from "@/pages/IssueChainboardsSemiFinishedPartFlowCard";
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
const IssueChainboardsSemiFinishedPartFlowCard = React.lazy(() =>
  import("@/pages/IssueChainboardsSemiFinishedPartFlowCard").then((res) => ({
    default: res.IssueChainboardsSemiFinishedPartFlowCard,
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

const PrivateRoute = () => {
  console.log(localStorage.getItem("token_key"));
  if (localStorage.getItem("token_key")) {
  }
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
      children: [
        {
          path: "add_part_flow_card",
          element: <AddPartFlowCard />,
        },
        {
          path: "add_assembly_flow_card",
          element: <AddAssemblyFlowCard />,
        },
        {
          path: "flow_card_query",
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
          path: "/issue_chainboards_semi_finished_part_flow_card",
          element: <IssueChainboardsSemiFinishedPartFlowCard />,
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
      ],
    },
  ];
  return useRoutes(routeConfig);
};

export default PrivateRoute;
