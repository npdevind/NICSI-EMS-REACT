import {
    Card,
    Button,
    Typography,
    CardBody,
    Input,
    CardHeader,
} from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../app/Slices/UserSlice";
import { toast } from "react-toastify";

const Login = ({ setType }) => {
    const changedType = () => {
        setType("register");
    };

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

    const [loading, setLoading] = useState(false);
    const logInSchema = Yup.object().shape({
        email: Yup.string()
            .email("Please enter a valid email")
            .required("This field is required"),
        password: Yup.string().required("This field is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: logInSchema,
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
            try {
                const res = await fetch(process.env.APP_BASE_API + "/login", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(values),
                });
                const response = await res.json();

                if (res.ok) {
                    setLoading(false);
                    dispatch(
                        login({
                            token: response?.data?.token,
                            id: response?.data?.user.uid,
                            email: response?.data?.user.email,
                            name: response?.data?.user.name,
                            type: response?.data?.user.type,
                        })
                    );
                    localStorage.setItem("ems_token", response?.data?.token);
                    navigate(from, { replace: true });
                    toast.error("Welcome");
                } else {
                    setLoading(false);
                    toast.error(response.message);
                }
            } catch (error) {
                setLoading(false);
                toast.error(error);
            }
        },
    });

    return (
        <>
            <div className="flex justify-center m-8">
                <Card className="mt-16 w-96">
                    <CardHeader
                        className="relative px-6 py-5 m h-16 mb-2"
                        color="blue-gray"
                    >
                        <div className="flex justify-center">
                            <Typography variant="h5" color="blue-gray">
                                Sign In
                            </Typography>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <form
                            className="mt-8 mb-2 w-90 max-w-screen-xl sm:w-auto"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="mb-4 flex flex-col gap-6">
                                <div className="w-[auto]">
                                    <Input
                                        name="email"
                                        size="lg"
                                        label="Email"
                                        error={formik.errors.email && true}
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                    />
                                    {formik.errors.email ? (
                                        <Typography
                                            variant="small"
                                            color="red"
                                            className="font-normal"
                                        >
                                            {formik.errors.email}
                                        </Typography>
                                    ) : null}
                                </div>

                                <div className="w-[auto]">
                                    <Input
                                        name="password"
                                        size="lg"
                                        label="Password"
                                        type="password"
                                        error={formik.errors.password && true}
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                    />
                                    {formik.errors.password ? (
                                        <Typography
                                            variant="small"
                                            color="red"
                                            className="font-normal"
                                        >
                                            {formik.errors.password}
                                        </Typography>
                                    ) : null}
                                </div>

                                <Typography
                                    color="blue-gray"
                                    className="flex justify-center"
                                >
                                    <Link
                                        className="font-medium text-blue-500 transition-colors hover:text-blue-700 bg-transparent border-none"
                                        onClick={() => changedType()}
                                    >
                                        Not have an account?
                                    </Link>
                                </Typography>
                            </div>
                            <Button
                                className="mt-6 float-right"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Login"}
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
};

export default Login;
