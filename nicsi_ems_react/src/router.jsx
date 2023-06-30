import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./pages/layout/HomeLayout";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/home/Dashboard";
import AuthProvider from "./pages/provider/AuthProvider";

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
        element: <AuthProvider />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
        ],
    },
]);

export default router;
