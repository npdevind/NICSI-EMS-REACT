import {
    Button,
    Group,
    Loader,
    Modal,
    Paper,
    PasswordInput,
    Stack,
    TextInput,
} from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { upperFirst, useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import {
    IconAlertSquare,
    IconCloudLockOpen,
    IconEyeCheck,
    IconEyeOff,
    IconLock,
    IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import { login } from "../../app/Slices/UserSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Login = ({ type }) => {
    const [opened, { open, close }] = useDisclosure(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

    console.log(from);

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },

        validate: {
            email: isEmail("Please enter valid email"),
            password: isNotEmpty("Password is required"),
        },
    });

    // const forgetPassword = () => {
    //     notifications.show({
    //         title: "Coming Soon!",
    //         message: "This features will implemented soon.",
    //         position: "top-right",
    //         autoClose: 4000,
    //     });
    // };
    const [loading, setLoading] = useState(false);
    const submitLogin = async (values) => {
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
            } else {
                setLoading(false);
                notifications.show({
                    title: "Error",
                    message: response.message,
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
                <form onSubmit={form.onSubmit((values) => submitLogin(values))}>
                    <Stack>
                        <TextInput
                            label="Email"
                            type="text"
                            name="email"
                            icon={<IconUser size="1rem" />}
                            {...form.getInputProps("email")}
                            withAsterisk
                        />
                        <PasswordInput
                            label="Password"
                            name="password"
                            icon={<IconLock size="1rem" />}
                            withAsterisk
                            visibilityToggleIcon={({ reveal, size }) =>
                                reveal ? (
                                    <IconEyeOff size={size} />
                                ) : (
                                    <IconEyeCheck size={size} />
                                )
                            }
                            {...form.getInputProps("password")}
                        />

                        <Group position="apart" mt="xl">
                            <Button
                                variant="light"
                                fullWidth
                                leftIcon={<IconCloudLockOpen />}
                                compact
                                type="button"
                                // onClick={() => {
                                //     forgetPassword();
                                // }}
                                onClick={open}
                            >
                                Forget Password
                            </Button>
                            <Button type="submit" fullWidth>
                                {loading ? <Loader /> : upperFirst(type)}
                            </Button>
                        </Group>
                    </Stack>
                </form>
            </Paper>
            <Modal
                opened={opened}
                onClose={close}
                title="Forget Password"
                overlayProps={{
                    opacity: 0.55,
                    blur: 3,
                }}
                style={{ width: "88%" }}
            >
                <TextInput
                    label="Your Email"
                    description="Please enter your register emil id."
                    placeholder="email"
                    withAsterisk
                />
                <Button type="submit" fullWidth mt="xl">
                    Submit
                </Button>
            </Modal>
        </>
    );
};

export default Login;
