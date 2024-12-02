import React from "react";
import { Goal } from "../types/goals";
import Button from "./Button";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";
import Select from "./Select";

interface GoalFormProps {
    formData: Goal;
    onFormDataChange: (updatedData: Partial<Goal>) => void;
    onSave: () => void;
    onCancel: () => void;
}

export default function GoalForm({ formData, onFormDataChange, onSave, onCancel }: GoalFormProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onFormDataChange({ [name]: value });
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSave();
            }}
            className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
        >
            <h2 className="text-xl font-bold mb-4">Goal Details</h2>

            <InputField
                label="Title"
                type="text"
                name="title"
                value={formData.title}
                placeholder="Enter your goal title"
                onChange={handleChange}
            />

            <TextareaField
                label="Description"
                name="description"
                value={formData.description}
                placeholder="Describe your goal"
                onChange={handleChange}
            />

            <Select<string>
                value={formData.category}
                onChange={(value) => onFormDataChange({ category: value })}
                options={[
                    { value: "Health", label: "Health" },
                    { value: "Work", label: "Work" },
                    { value: "Personal", label: "Personal" },
                ]}
                label="Category"
            />

            <Select<Goal["priority"]>
                value={formData.priority}
                onChange={(value) => onFormDataChange({ priority: value })}
                options={[
                    { value: "High", label: "High" },
                    { value: "Medium", label: "Medium" },
                    { value: "Low", label: "Low" },
                ]}
                label="Priority"
            />

            <InputField
                label="Date"
                type="date"
                name="date"
                value={formData.date || ""}
                onChange={handleChange}
            />

            <div className="flex justify-end" style={{ gap: "12px" }}>
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </div>
        </form>
    );
}
