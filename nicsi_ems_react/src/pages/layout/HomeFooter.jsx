import { createStyles, Container, Group, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    footer: {
        marginTop: rem(120),
        borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    },

    inner: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: theme.spacing.sm,
        paddingBottom: theme.spacing.sm,

        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column",
        },
    },

    links: {
        [theme.fn.smallerThan("xs")]: {
            marginTop: theme.spacing.sm,
        },
    },
}));

const HomeFooter = () => {
    const { classes } = useStyles();

    return (
        <>
            <div className={classes.footer}>
                <Container className={classes.inner}>
                    <h4>NICSI-EMS</h4>
                    <Group className={classes.links}>npdevind@gmail</Group>
                </Container>
            </div>
        </>
    );
};

export default HomeFooter;
