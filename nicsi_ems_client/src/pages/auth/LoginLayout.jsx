import { useState } from "react";
import Login from "../../components/auth/Login";
import Registration from "../../components/auth/Registration";

const LoginLayout = () => {
    const [type, setType] = useState("login");
    console.log(type);
    return (
        <>
            {type === "login" && <Login setType={setType} />}
            {type === "register" && <Registration setType={setType} />}
        </>
    );
};

export default LoginLayout;
