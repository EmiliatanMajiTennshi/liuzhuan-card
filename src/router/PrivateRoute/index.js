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
          element: <AddPartFlowCard></AddPartFlowCard>,
        },
        {
          path: "add_assembly_flow_card",
          element: <AddAssemblyFlowCard></AddAssemblyFlowCard>,
        },
        {
          path: "flow_card_query",
          element: <FlowCardQuery></FlowCardQuery>,
        },
        {
          path: "/operator_simple_task",
          element: <OperatorSimpleTask></OperatorSimpleTask>,
        },
        {
          path: "/flow_card_cancel",
          element: <FlowCardCancel></FlowCardCancel>,
        },
        {
          path: "/add_employee_info",
          element: <AddEmployeeInfo></AddEmployeeInfo>,
        },
        {
          path: "/full_inspection_defect_rate",
          element: <FullInspectionDefectRate></FullInspectionDefectRate>,
        },
      ],
    },
  ]);
};

export default PrivateRoute;
