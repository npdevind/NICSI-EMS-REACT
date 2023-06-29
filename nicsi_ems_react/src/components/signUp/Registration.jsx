import {
    Button,
    Group,
    Paper,
    PasswordInput,
    Select,
    Stack,
    TextInput,
} from "@mantine/core";
import { hasLength, isEmail, isNotEmpty, useForm } from "@mantine/form";
import { upperFirst } from "@mantine/hooks";
import {
    IconEyeCheck,
    IconEyeOff,
    IconLock,
    IconMail,
    IconUser,
    IconUserBolt,
} from "@tabler/icons-react";
const Registration = ({ type }) => {
    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            password: "secret",
            userType: "",
            termsOfService: false,
        },

        validate: {
            name: hasLength(
                { min: 2, max: 10 },
                "Name must be 2-10 characters long"
            ),
            email: isEmail("Invalid email"),
            password: isNotEmpty("Password is required"),
            userType: isNotEmpty("User type is required"),
        },
    });
    return (
        <>
            <Paper radius="md" p="xl" withBorder>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <Stack>
                        <TextInput
                            label="Name"
                            type="text"
                            name="name"
                            icon={<IconUser size="1rem" />}
                            error
                            placeholder="name"
                            description="Please enter your name."
                            withAsterisk
                            {...form.getInputProps("name")}
                        />
                        <TextInput
                            label="Email"
                            type="text"
                            name="email"
                            icon={<IconMail size="1rem" />}
                            error
                            placeholder="email"
                            description="Please enter your email id."
                            withAsterisk
                            {...form.getInputProps("email")}
                        />
                        <PasswordInput
                            label="Password"
                            name="password"
                            icon={<IconLock size="1rem" />}
                            error
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
                            {...form.getInputProps("password")}
                        />

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
                            {...form.getInputProps("userType")}
                        />

                        <Group position="apart" mt="xl">
                            <Button type="submit" fullWidth mt="xl">
                                {upperFirst(type)}
                            </Button>
                        </Group>
                    </Stack>
                </form>
            </Paper>
        </>
    );
};

export default Registration;
