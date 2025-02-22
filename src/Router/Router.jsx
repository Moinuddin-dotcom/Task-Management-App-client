import { createBrowserRouter } from "react-router-dom";
import MainCompo from "../MotherComponent/MainCompo";
import Home from "../ChildOfMotherCompo/Home";
import ActivityLog from "../ChildOfMotherCompo/SectionsOfHome/ActivityLog";
import ErrorPage from "../Components/ErrorPage/ErrorPage";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainCompo />,
        errorElement: <ErrorPage />,
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