import { Box, Group, NavLink, Navbar } from "@mantine/core";
import { IconHome2, IconUser } from "@tabler/icons-react";
import { useState } from "react";

const linkArray = [
    {
        link: "/dashboard",
        label: "Dashboard",
        icon: <IconHome2 size="1rem" stroke={1.5} />,
    },
    {
        link: "/profile",
        label: "Profile",
        icon: <IconUser size="1rem" stroke={1.5} />,
    },
];

const DashboardSideBar = () => {
    const [active, setActive] = useState(0);
    return (
        <>
            <Box w={240}>
                <Navbar height={640} width={{ sm: 230 }} p="md">
                    <Navbar.Section>
                        <Group position="center">
                            <h4>NICSI EMS</h4>
                        </Group>
                    </Navbar.Section>

                    {linkArray &&
                        linkArray.map((item, index) => {
                            return (
                                <div key={index}>
                                    <NavLink
                                        label={item.label}
                                        icon={item.icon}
                                        onClick={() => setActive(index)}
                                        active={index === active}
                                        link={item.link}
                                    />
                                </div>
                            );
                        })}
                </Navbar>
            </Box>
        </>
    );
};

export default DashboardSideBar;
