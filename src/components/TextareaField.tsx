import React from "react";

interface TextareaFieldProps {
    label: string;
    name: string;
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextareaField({ label, name, value, placeholder, onChange }: TextareaFieldProps) {
    return (
        <div className="mb-4">
            <label className="block font-medium mb-2">{label}</label>
            <textarea
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-lg p-2"
            />
        </div>
    );
}
