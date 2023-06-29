import { useToggle } from "@mantine/hooks";
import { Text, Anchor, Title } from "@mantine/core";
import HomeHeader from "./layout/HomeHeader";
import Login from "../components/signUp/Login";
import Registration from "../components/signUp/Registration";

const SignUp = () => {
    const [type, toggle] = useToggle(["login", "register"]);

    return (
        <>
            <HomeHeader />
            <div
                style={{
                    paddingTop: "2.5rem",
                    maxWidth: "26.25rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                <Title
                    align="center"
                    sx={(theme) => ({
                        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                        fontWeight: 800,
                    })}
                >
                    {type === "register" ? "Welcome" : "Welcome back!"}
                </Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    <Anchor
                        component="button"
                        type="button"
                        color="dimmed"
                        onClick={() => toggle()}
                        size="sm"
                        mb={10}
                        style={{ textDecoration: "none" }}
                    >
                        {type === "register"
                            ? "Already have an account? Login"
                            : "Don't have an account? Register"}
                    </Anchor>
                </Text>

                {type === "login" && <Login type={type} />}
                {type === "register" && <Registration type={type} />}
            </div>
        </>
    );
};

export default SignUp;
