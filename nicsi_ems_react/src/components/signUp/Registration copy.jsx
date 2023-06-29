import {
    Button,
    Group,
    Paper,
    PasswordInput,
    Select,
    Stack,
    TextInput,
} from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { IconEyeCheck, IconMail, IconUserBolt } from "@tabler/icons-react";
import { IconEyeOff, IconLock, IconUser } from "@tabler/icons-react";
import { Field, Formik } from "formik";
import * as Yup from "yup";

const Registration = ({ type }) => {
    const RegistrationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
            .email("Invalid email address format")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be 6 characters at minimum")
            .required("Password is required"),
        useType: Yup.string().required("Type is required"),
    });
    return (
        <>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    name: "",
                    userType: "",
                }}
                validationSchema={RegistrationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
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
                                    label="Name"
                                    type="text"
                                    name="name"
                                    icon={<IconUser size="1rem" />}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    error={errors.name}
                                    placeholder="name"
                                    description="Please enter your name."
                                    withAsterisk
                                />
                                <TextInput
                                    label="Email"
                                    type="text"
                                    name="email"
                                    icon={<IconMail size="1rem" />}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    error={errors.email}
                                    placeholder="email"
                                    description="Please enter your email id."
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
                                    description="Please enter a new password."
                                    withAsterisk
                                    visibilityToggleIcon={({ reveal, size }) =>
                                        reveal ? (
                                            <IconEyeOff size={size} />
                                        ) : (
                                            <IconEyeCheck size={size} />
                                        )
                                    }
                                />
                                {/* <Field name="color" component="select">
                                    <option value="red">Red</option>
                                    <option value="green">Green</option>
                                    <option value="blue">Blue</option>
                                </Field> */}

                                <Field name="userType">
                                    <Select
                                        label="Type"
                                        description="Select your type."
                                        placeholder="Pick one"
                                        icon={<IconUserBolt size="1rem" />}
                                        name="userType"
                                        withAsterisk
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.userType}
                                        error={errors.userType}
                                        allowDeselect
                                        data={[
                                            { value: "admin", label: "Admin" },
                                            {
                                                value: "developer",
                                                label: "Developer",
                                            },
                                            {
                                                value: "designer",
                                                label: "Designer",
                                            },
                                            { value: "other", label: "Other" },
                                        ]}
                                    />
                                </Field>

                                <Group position="apart" mt="xl">
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

export default Registration;
