import React from "react";

interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputField({ label, type, name, value, placeholder, onChange }: InputFieldProps) {
    return (
        <div className="mb-4">
            <label className="block font-medium mb-2">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-lg p-2"
            />
        </div>
    );
}
