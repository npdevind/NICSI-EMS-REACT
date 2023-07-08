import React from "react";

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ToastContainer } from "react-toastify";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./app/store";
const queryClient = new QueryClient();

// import DarkModeToggle from "./components/DarkModeToggle";

// const App = () => {
//     return (
//         <div className="container mx-auto">
//             <h1 className="text-4xl font-bold">My App</h1>
//             <DarkModeToggle />
//             {/* Rest of your app */}
//         </div>
//     );
// };

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <RouterProvider router={router} />
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable={false}
                        theme="colored"
                    />
                </Provider>
            </QueryClientProvider>
        </ThemeProvider>
    </React.StrictMode>
);
