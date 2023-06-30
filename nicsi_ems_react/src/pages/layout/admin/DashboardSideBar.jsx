import { Box, Group, NavLink, Navbar } from "@mantine/core";
import { IconHome2, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../app/Slices/UserSlice";

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
    const dispatch = useDispatch();
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
                                    <NavLink label={item.label} icon={item.icon} onClick={() => setActive(index)} active={index === active} link={item.link} />
                                </div>
                            );
                        })}

                    <Navbar.Section>
                        <Link
                            className="dropdown-item"
                            to="#"
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(logout());
                            }}
                        >
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Logout
                        </Link>
                    </Navbar.Section>
                </Navbar>
            </Box>
        </>
    );
};

export default DashboardSideBar;
