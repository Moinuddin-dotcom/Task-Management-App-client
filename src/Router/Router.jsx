import { createBrowserRouter } from "react-router-dom";
import MainCompo from "../MotherComponent/MainCompo";
import Login from "../Components/LogIn/Login";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainCompo />,
        children: [
            {
                path: "/",
                element: <h1>Home</h1>
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    }
])