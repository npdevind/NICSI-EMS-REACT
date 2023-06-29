import {
    Button,
    Group,
    Paper,
    PasswordInput,
    Stack,
    TextInput,
} from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { Formik } from "formik";
import * as Yup from "yup";
import {
    // IconCloudLockOpen,
    IconEyeCheck,
    IconEyeOff,
    IconLock,
    IconUser,
} from "@tabler/icons-react";

const Login = ({ type }) => {
    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address format")
            .required("Email is required"),
        password: Yup.string()
            .min(3, "Password must be 3 characters at minimum")
            .required("Password is required"),
    });
    return (
        <>
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    console.log(values);
                }}
            >
                {({
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <Paper radius="md" p="xl" withBorder>
                        <form onSubmit={handleSubmit}>
                            <Stack>
                                <TextInput
                                    label="Email"
                                    type="text"
                                    name="email"
                                    icon={<IconUser size="1rem" />}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    error={errors.email}
                                    placeholder="email"
                                    description="Please enter your registered email id."
                                    withAsterisk
                                />
                                <PasswordInput
                                    label="Password"
                                    name="password"
                                    icon={<IconLock size="1rem" />}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    error={errors.password}
                                    placeholder="password"
                                    description="Please enter your EMS password."
                                    withAsterisk
                                    visibilityToggleIcon={({ reveal, size }) =>
                                        reveal ? (
                                            <IconEyeOff size={size} />
                                        ) : (
                                            <IconEyeCheck size={size} />
                                        )
                                    }
                                />

                                <Group position="apart" mt="xl">
                                    {/* <Button
                                        variant="light"
                                        fullWidth
                                        leftIcon={<IconCloudLockOpen />}
                                        type="button"
                                    >
                                        Forget Password
                                    </Button> */}
                                    <Button
                                        type="submit"
                                        fullWidth
                                        mt="xl"
                                        disabled={isSubmitting}
                                    >
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
