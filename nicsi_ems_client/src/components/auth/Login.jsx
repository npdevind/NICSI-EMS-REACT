import {
    Card,
    Button,
    Typography,
    CardBody,
    Input,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const Login = ({ setType }) => {
    const changedType = () => {
        setType("register");
    };
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
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            setLoading(true);
        },
    });

    return (
        <>
            <div className="flex justify-center">
                <Card className="mt-6 w-96">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray">
                            Sign In
                        </Typography>
                        <Typography color="gray" className=" font-normal">
                            Not have an account?{" "}
                            <Link
                                className="font-medium text-blue-500 transition-colors hover:text-blue-700 bg-transparent border-none"
                                onClick={() => changedType()}
                            >
                                Sign Up
                            </Link>
                        </Typography>

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
                            </div>
                            <Button
                                className="mt-6"
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
