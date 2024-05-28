import { useRoutes } from "react-router-dom";
import { Login } from "../../pages/Login";
import { Home } from "../../pages/Home";
import AuthRoute from "@/components/AuthRoute/AuthRoute";
import { AddPartFlowCard } from "@/pages/AddPartFlowCard";
import { AddAssemblyFlowCard } from "@/pages/AddAssemblyFlowCard";
import { FlowCardQuery } from "@/pages/FlowCardQuery";
import { OperatorSimpleTask } from "@/pages/OperatorSimpleTask";
import { FlowCardCancel } from "@/pages/FlowCardCancel";
import { AddEmployeeInfo } from "@/pages/AddEmployeeInfo";
import { FullInspectionDefectRate } from "@/pages/FullInspectionDefectRate";
import { IssueChainboardsSemiFinishedPartFlowCard } from "@/pages/IssueChainboardsSemiFinishedPartFlowCard";
import { IssueRollerNestSemiFinishedPartFlowCard } from "@/pages/IssueRollerNestSemiFinishedPartFlowCard";
import { IssueFinishedPartFlowCard } from "@/pages/IssueFinishedPartFlowCard";
import { IssueOutsourcingFlowCard } from "@/pages/IssueOutsourcingFlowCard";
import { IssueReplenishmentOrderFlowCard } from "@/pages/IssueReplenishmentOrderFlowCard";
import { PartFlowCardQuery } from "@/pages/PartFlowCardQuery";
import { ProductionProcessFlowCardAndDispatchList } from "@/pages/ProductionProcessFlowCardAndDispatchList";

const PrivateRoute = () => {
  return useRoutes([
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
      ],
    },
  ]);
};

export default PrivateRoute;
