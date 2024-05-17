import { useRoutes } from "react-router-dom";
import { Login } from "../../pages/Login";
import { Home } from "../../pages/Home";
import AuthRoute from "@/components/AuthRoute/AuthRoute";
import { AddPartFlowCard } from "@/pages/AddPartFlowCard";
import { AddAssemblyFlowCard } from "@/pages/AddAssemblyFlowCard";

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
      ],
    },
  ]);
};

export default PrivateRoute;
