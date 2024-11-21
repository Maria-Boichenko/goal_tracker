import React, {useState} from "react";

export default function DarkModeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(
        document.documentElement.classList.contains("dark") // Проверяем, есть ли уже класс "dark"
    );

    const toggleDarkMode = () => {
        if (isDarkMode) {
            // Удаляем класс "dark" для светлого режима
            document.documentElement.classList.remove("dark");
        } else {
            // Добавляем класс "dark" для тёмного режима
            document.documentElement.classList.add("dark");
        }
        setIsDarkMode(!isDarkMode); // Обновляем состояние
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
    );
}

