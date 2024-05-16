import { useRoutes } from "react-router-dom"; 
import { Login } from "../../pages/Login"; 
import { Home } from "../../pages/Home";

const PrivateRoute = ()=>{
    return useRoutes([
        {
            path:'/',
            element:<Login/>,

        },
        {
            path:'/home',
            element:<Home/>
        }
    ])
}

export default PrivateRoute