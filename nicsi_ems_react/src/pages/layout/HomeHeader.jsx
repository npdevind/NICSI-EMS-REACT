import { Header, Group, Burger, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";

const HomeHeader = () => {
    const [opened, { toggle }] = useDisclosure(false);

    const links = [
        {
            link: "/",
            label: "Home",
        },
        { link: "/about", label: "About" },
    ];

    return (
        <>
            <Header className="shadow-lg">
                <Container>
                    <div>
                        <h5 className="text-2xl font-bold">NICSI-EMS</h5>
                        <Group spacing={5}>
                            {links.map((link) => (
                                <Link key={link.label} to={link.link}>
                                    {link.label}
                                </Link>
                            ))}
                        </Group>
                        <Burger opened={opened} onClick={toggle} size="sm" />
                    </div>
                </Container>
            </Header>
        </>
    );
};

export default HomeHeader;
