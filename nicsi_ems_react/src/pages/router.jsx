import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import SignUp from "./SignUp";
import Dashboard from "./home/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
    },
    {
        path: "/sign-up",
        element: <SignUp />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
]);

export default router;
