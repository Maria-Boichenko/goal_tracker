import React, { useState } from "react";
import Modal from "./Modal";
import GoalForm from "./GoalForm";
import { Goal } from "../types/goals";

interface GoalFormModalProps {
    goal: Goal | null;
    onSave: (goal: Goal) => void;
    onCancel: () => void;
    isAddingGoal: boolean;
}

export default function GoalFormModal({ goal, onSave, onCancel, isAddingGoal }: GoalFormModalProps) {
    const today = new Date().toISOString().split("T")[0];
    const [formData, setFormData] = useState<Goal>({
        title: goal?.title || "",
        description: goal?.description || "",
        category: goal?.category || "Personal",
        priority: goal?.priority || "Medium",
        date: goal?.date || today,
    });

    const handleFormDataChange = (updatedData: Partial<Goal>) => {
        setFormData((prev) => ({ ...prev, ...updatedData }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <Modal onClose={onCancel}>
            <h2 className="text-lg font-bold mb-4">
                {isAddingGoal ? "Add New Goal" : "Edit Goal"}
            </h2>
            <GoalForm
                formData={formData}
                onFormDataChange={handleFormDataChange}
                onSave={handleSave}
                onCancel={onCancel}
            />
        </Modal>
    );
}
