import { createBrowserRouter } from "react-router-dom";
import MainCompo from "../MotherComponent/MainCompo";
import Home from "../ChildOfMotherCompo/Home";
import ActivityLog from "../ChildOfMotherCompo/SectionsOfHome/ActivityLog";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainCompo />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/activitylog",
                element: <ActivityLog />
            }
        ]
    },
])