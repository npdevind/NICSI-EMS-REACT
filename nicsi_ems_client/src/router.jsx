import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./pages/layout/HomeLayout";
import Login from "./pages/auth/Login";
// import SignUp from "./pages/SignUp";
// import Dashboard from "./pages/home/Dashboard";
import AuthProvider from "./pages/provider/AuthProvider";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        element: <AuthProvider />,
        children: [
            {
                path: "/dashboard",
                element: "",
            },
        ],
    },
]);

export default router;
