import { Header, Group, Burger, Container, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import logo from "../../../public/assets/logo.jpg";

const HomeHeader = () => {
    const [opened, { toggle }] = useDisclosure(false);

    const links = [
        {
            link: "/",
            label: "Home",
        },
        { link: "/about", label: "About" },
        { link: "/career", label: "Career" },
    ];

    return (
        <>
            <Header className="shadow-lg homeHeader">
                <Container>
                    <img src={logo} alt="" className="homeHeaderLogo" />
                    <Group spacing={5} className="homeGroup">
                        {links.map((link) => (
                            <Link key={link.label} to={link.link} className="homeHeaderLink">
                                <Button variant="gradient" gradient={{ from: "teal", to: "blue", deg: 60 }}>
                                    {link.label}
                                </Button>
                            </Link>
                        ))}
                    </Group>
                </Container>
            </Header>
        </>
    );
};

export default HomeHeader;
