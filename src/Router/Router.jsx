import { createBrowserRouter } from "react-router-dom";
import MainCompo from "../MotherComponent/MainCompo";
import Home from "../ChildOfMotherCompo/Home";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainCompo />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    },
])