import React from "react";
import { Goal } from "../types/goals";
import Button from "./Button";
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

    const handlePriorityChange = (value: Goal["priority"]) => {
        onFormDataChange({ priority: value });
    };

    const handleCategoryChange = (value: string) => {
        onFormDataChange({ category: value });
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
            <div className="mb-4">
                <label className="block font-medium mb-2">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter your goal title"
                    className="w-full border border-gray-300 rounded-lg p-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block font-medium mb-2">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your goal"
                    className="w-full border border-gray-300 rounded-lg p-2"
                />
            </div>
            <Select<string>
                value={formData.category}
                onChange={handleCategoryChange}
                options={[
                    { value: "Health", label: "Health" },
                    { value: "Work", label: "Work" },
                    { value: "Personal", label: "Personal" },
                ]}
                label="Category"
            />
            <Select<Goal["priority"]>
                value={formData.priority}
                onChange={handlePriorityChange}
                options={[
                    { value: "High", label: "High" },
                    { value: "Medium", label: "Medium" },
                    { value: "Low", label: "Low" },
                ]}
                label="Priority"
            />
            <div className="mb-4">
                <label className="block font-medium mb-2">Date</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date || ""}
                    onChange={handleChange}
                    placeholder="YYYY-MM-DD"
                    className="w-full border border-gray-300 rounded-lg p-2"
                />
            </div>
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
