import { useEffect, useState } from "react";

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <button
            className="bg-gray-200 dark:bg-gray-800 p-2 rounded-md"
            onClick={() => setDarkMode((prevMode) => !prevMode)}
        >
            {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
    );
};

export default DarkModeToggle;
