import React from "react";

interface Option {
    value: string;
    label: string;
    icon?: React.ReactNode;
}

interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    label?: string;
    placeholder?: string;
}

export default function Select ({
                                    value,
                                    onChange,
                                    options,
                                    label,
                                    placeholder = "Select an option",
                                }: SelectProps) {
    return (
        <div className="mb-4">
            {label && <label className="block font-serif font-medium mb-2">{label}</label>}
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border border-grey-300 rounded-lg p-2"
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}