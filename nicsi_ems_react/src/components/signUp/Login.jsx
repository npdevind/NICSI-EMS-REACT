import { Button, Group, Paper, Stack, TextInput } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { Formik } from "formik";
import * as Yup from "yup";

const Login = ({ type }) => {
    const LoginSchema = Yup.object().shape({
        email: Yup.string()

            // Format Validation
            .email("Invalid email address format")

            // Required Field Validation
            .required("Email is required"),
        password: Yup.string()

            //Minimum Character Validation
            .min(3, "Password must be 3 characters at minimum")
            .required("Password is required"),
    });
    return (
        <>
            <Formik
                initialValues={{ email: "", password: "" }}
                // validate={(values) => {
                //     const errors = {};
                //     if (!values.email) {
                //         errors.email = "Required";
                //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                //         errors.email = "Invalid email address";
                //     } else if (!values.password) {
                //         errors.password = "Required";
                //     }
                //     return errors;
                // }}
                validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    console.log(values);
                }}
            >
                {({ values, errors, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <Paper radius="md" p="xl" withBorder>
                        <form onSubmit={handleSubmit}>
                            <Stack>
                                <TextInput type="text" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} error={errors.email} />
                                <TextInput type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} error={errors.password} />

                                <Group position="apart" mt="xl">
                                    <Button type="submit" fullWidth mt="xl" disabled={isSubmitting}>
                                        {upperFirst(type)}
                                    </Button>
                                </Group>
                            </Stack>
                        </form>
                    </Paper>
                )}
            </Formik>
        </>
    );
};

export default Login;
