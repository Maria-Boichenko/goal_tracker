import { Goal } from "../types/goals";
import { useTasks } from "../context/TaskProvider";
import React from "react";

export const useGoalActions = (selectedDate: string) => {
    const { goals, setGoals } = useTasks();

    const handleAdd = (
        setEditedGoal: React.Dispatch<React.SetStateAction<Goal | null>>,
        setIsAddingGoal: React.Dispatch<React.SetStateAction<boolean>>,
        setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setEditedGoal({
            title: "",
            description: "",
            category: "",
            priority: "Medium",
            date: selectedDate,
            completed: false, // Новое поле completed
        });
        setIsAddingGoal(true);
        setIsModalOpen(true);
    };

    const handleToggle = (goal: Goal) => {
        setGoals((prev) => {
            const updatedGoals = { ...prev };
            updatedGoals[selectedDate] = (prev[selectedDate] || []).map((g) =>
                g.title === goal.title ? { ...g, completed: !g.completed } : g
            );
            return updatedGoals;
        });
    };

    const handleDelete = (index: number) => {
        setGoals((prev) => {
            const updatedGoals = [...(prev[selectedDate] || [])];
            updatedGoals.splice(index, 1);
            return { ...prev, [selectedDate]: updatedGoals };
        });
    };

    const handleEdit = (
        goal: Goal,
        setEditedGoal: React.Dispatch<React.SetStateAction<Goal | null>>,
        setIsAddingGoal: React.Dispatch<React.SetStateAction<boolean>>,
        setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        setEditedGoal(goal);
        setIsAddingGoal(false);
        setIsModalOpen(true);
    };

    const handleSave = (goal: Goal, editedGoal: Goal | null) => {
        const originalDate = editedGoal?.date || selectedDate;

        setGoals((prev) => {
            const updatedGoals = { ...prev };

            // Если дата изменилась, перемещаем задачу в новый день
            if (originalDate !== goal.date) {
                updatedGoals[originalDate] = (prev[originalDate] || []).filter(
                    (g) => g.title !== editedGoal?.title
                );
            }

            // Обновляем задачи на новой дате
            updatedGoals[goal.date || selectedDate] = [
                ...(updatedGoals[goal.date || selectedDate] || []).filter(
                    (g) => g.title !== editedGoal?.title
                ),
                goal,
            ];

            return updatedGoals;
        });
    };

    // Логика обновления статуса выполнения задачи
    const handleToggleCompleted = (goal: Goal) => {
        setGoals((prev) => {
            const updatedGoals = { ...prev };
            const date = goal.date || selectedDate;

            updatedGoals[date] = (prev[date] || []).map((g) =>
                g.title === goal.title ? { ...g, completed: !g.completed } : g
            );

            return updatedGoals;
        });
    };

    return { handleAdd, handleDelete, handleEdit, handleSave, handleToggleCompleted, goals, handleToggle };
};
