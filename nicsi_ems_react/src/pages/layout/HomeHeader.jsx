import { createStyles, Header, Group, Burger, Container, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
// import { IconChevronDown } from "@tabler/icons-react";
import { Link } from "react-router-dom";
// import { MantineLogo } from "@mantine/ds";

const useStyles = createStyles((theme) => ({
    inner: {
        height: rem(56),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    links: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    burger: {
        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    link: {
        display: "block",
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkLabel: {
        marginRight: rem(5),
    },
}));

const HomeHeader = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const { classes } = useStyles();

    const links = [
        {
            link: "/",
            label: "Home",
        },
        { link: "/about", label: "About" },
    ];
    // const items = links.map((link) => {
    //     const menuItems = link.links?.map((item) => <Menu.Item key={item.link}>{item.label}</Menu.Item>);

    //     if (menuItems) {
    //         return (
    //             <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
    //                 <Menu.Target>
    //                     <Link to={link.link} className={classes.link}>
    //                         <Center>
    //                             <span className={classes.linkLabel}>{link.label}</span>
    //                             <IconChevronDown size="0.9rem" stroke={1.5} />
    //                         </Center>
    //                     </Link>
    //                 </Menu.Target>
    //                 <Menu.Dropdown>{menuItems}</Menu.Dropdown>
    //             </Menu>
    //         );
    //     }

    //     return (
    //         <Link key={link.label} to={link.link} className={classes.link}>
    //             {link.label}
    //         </Link>
    //     );
    // });
    return (
        <>
            <Header>
                <Container>
                    <div className={classes.inner}>
                        {/* <MantineLogo size={28} /> */}
                        <h5 className="text-3xl font-bold underline">NICSI-EMS</h5>
                        <Group spacing={5} className={classes.links}>
                            {links.map((link) => (
                                <Link key={link.label} to={link.link} className={classes.link}>
                                    {link.label}
                                </Link>
                            ))}
                        </Group>
                        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
                    </div>
                </Container>
            </Header>
        </>
    );
};

export default HomeHeader;
