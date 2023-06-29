import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Notifications } from "@mantine/notifications";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Notifications />
        <RouterProvider router={router} />
    </React.StrictMode>
);
