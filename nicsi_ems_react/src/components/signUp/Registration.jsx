import { Button, Group, Loader, Paper, PasswordInput, Select, Stack, TextInput } from "@mantine/core";
import { hasLength, isEmail, isNotEmpty, useForm } from "@mantine/form";
import { upperFirst } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconAlertSquare, IconCheck, IconEyeCheck, IconEyeOff, IconLock, IconMail, IconUser, IconUserBolt } from "@tabler/icons-react";
import { useState } from "react";
const Registration = ({ type, toggle }) => {
    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            password: "",
            userType: "",
            termsOfService: false,
        },

        validate: {
            name: hasLength({ min: 5 }, "Name must be minimum 5 characters long"),
            email: isEmail("Invalid email"),
            password: isNotEmpty("Password is required"),
            userType: isNotEmpty("User type is required"),
        },
    });

    const [loading, setLoading] = useState(false);

    const submitRegistration = async (values) => {
        setLoading(true);
        try {
            const res = await fetch(process.env.APP_BASE_API + "/registration", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (res.ok) {
                const msg = await res.json();
                console.log(res);
                setLoading(false);
                notifications.show({
                    title: "Done",
                    message: msg.message,
                    position: "top-right",
                    autoClose: 5000,
                    icon: <IconCheck size="1rem" />,
                });
                toggle("login");
            } else {
                setLoading(false);
                const msg = await res.json();
                notifications.show({
                    title: "Error",
                    message: msg.message,
                    position: "top-right",
                    autoClose: 5000,
                    icon: <IconAlertSquare size="1rem" />,
                });
            }
        } catch (error) {
            setLoading(false);
            notifications.show({
                title: "Error",
                message: error,
                position: "top-right",
                autoClose: 5000,
                icon: <IconAlertSquare size="1rem" />,
            });
        }
    };

    return (
        <>
            <Paper radius="md" p="xl" withBorder>
                <form onSubmit={form.onSubmit((values) => submitRegistration(values))}>
                    <Stack>
                        <TextInput label="Name" type="text" name="name" icon={<IconUser size="1rem" />} error placeholder="name" description="Please enter your name." withAsterisk {...form.getInputProps("name")} />
                        <TextInput label="Email" type="text" name="email" icon={<IconMail size="1rem" />} error placeholder="email" description="Please enter your email id." withAsterisk {...form.getInputProps("email")} />
                        <PasswordInput label="Password" name="password" icon={<IconLock size="1rem" />} error placeholder="password" description="Please enter a new password." withAsterisk visibilityToggleIcon={({ reveal, size }) => (reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />)} {...form.getInputProps("password")} />

                        <Select
                            label="Type"
                            description="Select your type."
                            placeholder="Pick one"
                            icon={<IconUserBolt size="1rem" />}
                            name="userType"
                            withAsterisk
                            error
                            allowDeselect
                            data={[
                                { value: 1, label: "Admin" },
                                {
                                    value: 2,
                                    label: "Developer",
                                },
                                {
                                    value: 3,
                                    label: "Designer",
                                },
                                { value: 4, label: "Other" },
                            ]}
                            {...form.getInputProps("userType")}
                        />

                        <Group position="apart" mt="xl">
                            <Button type="submit" fullWidth mt="xl">
                                {loading ? <Loader /> : upperFirst(type)}
                            </Button>
                        </Group>
                    </Stack>
                </form>
            </Paper>
        </>
    );
};

export default Registration;
