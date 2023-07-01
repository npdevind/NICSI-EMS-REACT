import {
    createStyles,
    Image,
    Container,
    Title,
    Button,
    Group,
    Text,
    List,
    ThemeIcon,
    rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import image from "../../../public/assets/image.svg";
import HomeHeader from "./HomeHeader";
import { useNavigate } from "react-router-dom";
import HomeFeaturesCards from "./HomeFeaturesCards";
import HomeFooter from "./HomeFooter";

const useStyles = createStyles((theme) => ({
    inner: {
        display: "flex",
        justifyContent: "space-between",
        paddingTop: `calc(${theme.spacing.xl} * 4)`,
        paddingBottom: `calc(${theme.spacing.xl} * 4)`,
    },

    content: {
        maxWidth: rem(480),
        marginRight: `calc(${theme.spacing.xl} * 3)`,

        [theme.fn.smallerThan("md")]: {
            maxWidth: "100%",
            marginRight: 0,
        },
    },

    title: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: rem(44),
        lineHeight: 1.2,
        fontWeight: 900,

        [theme.fn.smallerThan("xs")]: {
            fontSize: rem(28),
        },
    },

    control: {
        [theme.fn.smallerThan("xs")]: {
            flex: 1,
        },
    },

    image: {
        flex: 1,

        [theme.fn.smallerThan("md")]: {
            display: "none",
        },
    },

    highlight: {
        position: "relative",
        backgroundColor: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
        }).background,
        borderRadius: theme.radius.sm,
        padding: `${rem(4)} ${rem(12)}`,
    },
}));

const HomeLayout = () => {
    const navigate = useNavigate();
    const { classes } = useStyles();

    const openSignUp = () => {
        navigate("/sign-up");
    };

    return (
        <>
            <HomeHeader />
            <Container mb={7}>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            Welcome to{" "}
                            <span className={classes.highlight}>NICSI</span>{" "}
                            Employee <br /> Management System
                        </Title>
                        <Text color="dimmed" mt="md">
                            Discover how NICSI-EMS Engage plugins can support
                            your team
                        </Text>

                        <List
                            mt={30}
                            spacing="sm"
                            size="sm"
                            icon={
                                <ThemeIcon size={20} radius="xl">
                                    <IconCheck size={rem(12)} stroke={1.5} />
                                </ThemeIcon>
                            }
                        >
                            <List.Item>
                                <b>Simplify and streamline HR</b> – Keep your
                                team connected, no matter where they live. Keep
                                track of who’s out, monitor engagement,
                                streamline communication, and more.
                            </List.Item>
                            <List.Item>
                                <b>Increased adoption</b> – Your team loves
                                Slack, so why send them somewhere else? Our
                                tools have 92% adoption within the first week.
                            </List.Item>
                            <List.Item>
                                <b>Foster better culture</b> – From meetup
                                roulettes, interest groups, and NPS, help your
                                team build better relationships and keep a pulse
                                on employee satisfaction.
                            </List.Item>
                        </List>

                        <Group mt={30}>
                            <Button
                                radius="xl"
                                size="md"
                                className={classes.control}
                                onClick={() => openSignUp()}
                            >
                                Get started
                            </Button>
                            <Button
                                variant="default"
                                radius="xl"
                                size="md"
                                className={classes.control}
                            >
                                Source code
                            </Button>
                        </Group>
                    </div>
                    <Image src={image} className={classes.image} />
                </div>
            </Container>
            <HomeFeaturesCards />
            <HomeFooter />
        </>
    );
};

export default HomeLayout;
