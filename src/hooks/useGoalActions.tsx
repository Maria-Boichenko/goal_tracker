import { Goal } from "../types/goals";
import { useTasks } from "../context/TaskProvider";
import React from "react";

export const useGoalActions = (selectedDate: string) => {
    const { goals, setGoals } = useTasks();

    const handleAdd = (setEditedGoal: React.Dispatch<React.SetStateAction<Goal | null>>, setIsAddingGoal: React.Dispatch<React.SetStateAction<boolean>>, setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
        setEditedGoal({
            title: "",
            description: "",
            category: "",
            priority: "Medium",
            date: selectedDate,
        });
        setIsAddingGoal(true);
        setIsModalOpen(true);
    };

    const handleDelete = (index: number) => {
        setGoals((prev) => {
            const updatedGoals = [...(prev[selectedDate] || [])];
            updatedGoals.splice(index, 1);
            return { ...prev, [selectedDate]: updatedGoals };
        });
    };

    const handleEdit = (goal: Goal, setEditedGoal: React.Dispatch<React.SetStateAction<Goal | null>>, setIsAddingGoal: React.Dispatch<React.SetStateAction<boolean>>, setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
        setEditedGoal(goal);
        setIsAddingGoal(false);
        setIsModalOpen(true);
    };

    const handleSave = (goal: Goal, editedGoal: Goal | null) => {
        const originalDate = editedGoal?.date || selectedDate;

        setGoals((prev) => {
            const updatedGoals = { ...prev };

            if (originalDate !== goal.date) {
                updatedGoals[originalDate] = (prev[originalDate] || []).filter(
                    (g) => g.title !== editedGoal?.title
                );
            }

            updatedGoals[goal.date || selectedDate] = [
                ...(updatedGoals[goal.date || selectedDate] || []).filter(
                    (g) => g.title !== editedGoal?.title
                ),
                goal,
            ];

            return updatedGoals;
        });
    };

    return { handleAdd, handleDelete, handleEdit, handleSave, goals };
};
