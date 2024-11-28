import React from "react";

interface Option {
    value: string;
    label: string;
    icon?: React.ReactNode;
}

interface SelectProps<T> {
    value: T;
    onChange: (value: T) => void;
    options: Option[];
    label?: string;
    placeholder?: string;
}

export default function Select<T> ({
                                    value,
                                    onChange,
                                    options,
                                    label,
                                    placeholder = "Select an option",
                                }: SelectProps<T>) {
    return (
        <div className="mb-4">
            {label && <label className="block font-serif font-medium mb-2">{label}</label>}
            <select
                value={value as string}
                onChange={(e) => onChange(e.target.value as T)}
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