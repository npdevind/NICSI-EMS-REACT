import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { login, logout } from "../../app/Slices/UserSlice";
import { LoadingOverlay } from "@mantine/core";

const AuthProvider = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const location = useLocation();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("ems_token");
            if (!user.isLogIn && token) {
                setError(null);
                setLoading(true);
                console.log("token=>" + token);
                try {
                    const res = await fetch(process.env.APP_BASE_API + "/user", {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-type": "application/json",
                            Authorization: "Bearer " + token,
                        },
                    });
                    console.log(res);
                    if (res.ok) {
                        const data = await res.json();
                        console.log(data);
                        dispatch(
                            login({
                                token: token,
                                id: data?.id,
                                email: data?.email,
                                name: data?.name,
                                type: data?.type,
                            })
                        );
                    } else {
                        const data = await res.json();
                        throw Error(data.message);
                    }
                } catch (error) {
                    dispatch(logout());
                    setLoading(false);
                    setError(error.message);
                }
            }
        })();
    }, [dispatch, user]);

    if (localStorage.getItem("ems_token")) {
        if (user?.isLogIn) return <Outlet />;
        else if (loading) return <LoadingOverlay loaderProps={{ size: "sm", color: "pink", variant: "bars" }} overlayOpacity={0.3} overlayColor="#c5c5c5" visible />;
        else if (error) return <Navigate to="/sign-up" state={{ from: location }} />;
        else return <LoadingOverlay loaderProps={{ size: "sm", color: "pink", variant: "bars" }} overlayOpacity={0.3} overlayColor="#c5c5c5" visible />;
    } else return <Navigate to="/sign-up" state={{ from: location }} />;
};

export default AuthProvider;
