import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const Registration = ({ setType }) => {
    const changedType = () => {
        setType("login");
    };
    const [loading, setLoading] = useState(false);
    const logInSchema = Yup.object().shape({
        email: Yup.string()
            .email("Please enter a valid email")
            .required("Please enter your email."),
        password: Yup.string().required("Please enter a new password"),
        name: Yup.string().required("Please enter your full name."),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
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
            <div className="flex justify-center m-8">
                <Card className="mt-16 w-96">
                    <CardHeader
                        className="relative px-6 py-5 m h-16 mb-2"
                        color="blue-gray"
                    >
                        <div className="flex justify-center">
                            <Typography variant="h5" color="blue-gray">
                                Sign Up
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
                                        name="name"
                                        size="lg"
                                        label="Name"
                                        error={formik.errors.name && true}
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                    />
                                    {formik.errors.name ? (
                                        <Typography
                                            variant="small"
                                            color="red"
                                            className="font-normal"
                                        >
                                            {formik.errors.name}
                                        </Typography>
                                    ) : null}
                                </div>
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
                                        Already have an account?
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

export default Registration;
