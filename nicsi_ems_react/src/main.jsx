import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import store from "./app/store";
import { Provider } from "react-redux";
import { Notifications } from "@mantine/notifications";
import "../src/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <RouterProvider router={router} />
                <Notifications />
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>
);
