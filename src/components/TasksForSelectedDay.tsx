import React, { useState } from "react";
import { useTasks } from "../context/TaskProvider";
import { Goal } from "../types/goals";
import { FaPlus } from "react-icons/fa";
import GoalListItem from "./GoalListItem";
import GoalFormModal from "./GoalFormModal";

interface TasksForSelectedDayProps {
    selectedDate: string;
}

export default function TasksForSelectedDay({ selectedDate }: TasksForSelectedDayProps) {
    const { goals, setGoals } = useTasks();
    const [editedGoal, setEditedGoal] = useState<Goal | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingGoal, setIsAddingGoal] = useState(false);

    const dayGoals = goals[selectedDate] || [];

    const handleAdd = () => {
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

    const handleEdit = (goal: Goal) => {
        setEditedGoal(goal);
        setIsAddingGoal(false);
        setIsModalOpen(true);
    };

    const handleSave = (goal: Goal) => {
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

        setIsModalOpen(false);
        setEditedGoal(null);
    };

    return (
        <div>
            {/* Заголовок с кнопкой добавления */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">
                     {selectedDate}
                </h2>
                <button
                    onClick={handleAdd}
                    className="text-blue-500 hover:text-blue-700 flex items-center"
                >
                    <FaPlus className="mr-2" />
                    Add Goal
                </button>
            </div>

            {/* Список целей */}
            {dayGoals.length === 0 ? (
                <p className="text-gray-400">No goals for this day</p>
            ) : (
                <ul className="list-disc pl-4">
                    {dayGoals.map((goal, index) => (
                        <GoalListItem
                            key={index}
                            goal={goal}
                            onEdit={handleEdit}
                            onDelete={() => handleDelete(index)} // Передаем index
                        />
                    ))}
                </ul>
            )}

            {/* Модальное окно для добавления/редактирования */}
            {isModalOpen && (
                <GoalFormModal
                    goal={editedGoal}
                    onSave={handleSave}
                    onCancel={() => setIsModalOpen(false)}
                    isAddingGoal={isAddingGoal}
                />
            )}
        </div>
    );
}
