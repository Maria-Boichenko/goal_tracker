import React, { useState } from "react";
import { Goal } from "../types/goals";
import Modal from "./Modal";
import Button from "./Button";
import Select from "./Select";

interface GoalFormModalProps {
    goal: Goal | null;
    onSave: (goal: Goal) => void;
    onCancel: () => void;
    isAddingGoal: boolean;
}

export default function GoalFormModal({
                                          goal,
                                          onSave,
                                          onCancel,
                                          isAddingGoal,
                                      }: GoalFormModalProps) {
    const today = new Date().toISOString().split("T")[0];
    const [formData, setFormData] = useState<Goal>({
        title: goal?.title || "",
        description: goal?.description || "",
        category: goal?.category || "",
        priority: goal?.priority || "Medium",
        date: goal?.date || today,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePriorityChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            priority: value as "High" | "Medium" | "Low",
        }));
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <Modal onClose={onCancel}>
            <h2 className="text-lg font-bold mb-4">
                {isAddingGoal ? "Add New Goal" : "Edit Goal"}
            </h2>
            <form>
                <div className="mb-4">
                    <label className="block mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                    />
                </div>
                <div className="mb-4">
                    <Select
                        label="Priority"
                        value={formData.priority}
                        onChange={handlePriorityChange}
                        options={[
                            { value: "High", label: "High" },
                            { value: "Medium", label: "Medium" },
                            { value: "Low", label: "Low" },
                        ]}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <Button onClick={onCancel} variant="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} variant="primary">
                        Save
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
