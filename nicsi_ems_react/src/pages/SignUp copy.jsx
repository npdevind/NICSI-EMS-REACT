import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { TextInput, PasswordInput, Text, Paper, Group, Button, Checkbox, Anchor, Stack, Title, createStyles, SegmentedControl, rem } from "@mantine/core";
import HomeHeader from "./layout/HomeHeader";

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
        boxShadow: theme.shadows.md,
        border: `${rem(2)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[1]}`,
    },

    indicator: {
        backgroundImage: theme.fn.gradient({ from: "blue", to: "dark" }),
    },

    control: {
        border: "0 !important",
    },

    label: {
        "&, &:hover": {
            "&[data-active]": {
                color: theme.white,
            },
        },
    },
}));

const SignUp = (props) => {
    const [type, toggle] = useToggle(["login", "register"]);
    const form = useForm({
        initialValues: {
            email: "",
            name: "",
            password: "",
            userType: "",
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
            password: (val) => (val.length <= 6 ? "Password should include at least 6 characters" : null),
        },
    });
    const { classes } = useStyles();

    const handelSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <>
            <HomeHeader />
            <div style={{ paddingTop: "2.5rem", maxWidth: "26.25rem", marginLeft: "auto", marginRight: "auto" }}>
                <Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 800 })}>
                    {type === "register" ? "Welcome" : "Welcome back!"}
                </Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    <Anchor component="button" type="button" color="dimmed" onClick={() => toggle()} size="sm" mb={10} style={{ textDecoration: "none" }}>
                        {type === "register" ? "Already have an account? Login" : "Don't have an account? Register"}
                    </Anchor>
                </Text>
                <Paper radius="md" p="xl" withBorder {...props}>
                    <form onSubmit={(event) => handelSubmit(event)}>
                        <Stack>
                            {type === "register" && <TextInput label="Name" placeholder="Your name" value={form.values.name} onChange={(event) => form.setFieldValue("name", event.currentTarget.value)} radius="md" />}

                            <TextInput required label="Email" placeholder="hello@mantine.dev" value={form.values.email} onChange={(event) => form.setFieldValue("email", event.currentTarget.value)} error={form.errors.email && "Invalid email"} radius="md" />

                            <PasswordInput required label="Password" placeholder="Your password" value={form.values.password} onChange={(event) => form.setFieldValue("password", event.currentTarget.value)} error={form.errors.password && "Password should include at least 6 characters"} radius="md" />

                            {type === "register" && <SegmentedControl radius="xl" size="md" data={["Developer", "Admin"]} name="userType" classNames={classes} mb={10} onChange={(event) => form.setFieldValue("userType", event)} />}

                            {type === "register" && <Checkbox label="I accept terms and conditions" checked={form.values.terms} onChange={(event) => form.setFieldValue("terms", event.currentTarget.checked)} />}
                        </Stack>

                        <Group position="apart" mt="xl">
                            <Button type="submit" fullWidth mt="xl">
                                {upperFirst(type)}
                            </Button>
                        </Group>
                    </form>
                </Paper>
            </div>
        </>
    );
};

export default SignUp;
