import React from "react";

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "danger";
    onClick?: () => void;
    children: React.ReactNode;
    disabled?: boolean;
}

const buttonStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
};

export default function Button({
                                   type = "button",
                                   variant = "primary",
                                   onClick,
                                   children,
                                   disabled = false,
                               }: ButtonProps){
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-4 py-2 rounded-lg shadow-md ${buttonStyles[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {children}
        </button>
    )
}
