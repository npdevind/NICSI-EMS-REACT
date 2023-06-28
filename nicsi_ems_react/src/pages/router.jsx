import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import SignUp from "./SignUp";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
    },
    {
        path: "/sign-up",
        element: <SignUp />,
    },
]);

export default router;
