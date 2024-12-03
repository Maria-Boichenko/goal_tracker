import React, { useState } from "react";
import { Goal } from "../types/goals";
import { FaPlus } from "react-icons/fa";
import GoalListItem from "./GoalListItem";
import GoalFormModal from "./GoalFormModal";
import { useGoalActions } from "../hooks/useGoalActions";

interface TasksForSelectedDayProps {
    selectedDate: string;
}

export default function TasksForSelectedDay({ selectedDate }: TasksForSelectedDayProps) {
    const [editedGoal, setEditedGoal] = useState<Goal | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingGoal, setIsAddingGoal] = useState(false);

    const { goals, handleToggle, handleAdd, handleDelete, handleEdit, handleSave } =
        useGoalActions(selectedDate);

    const dayGoals = goals[selectedDate] || [];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">{selectedDate}</h2>
                <button
                    onClick={() => handleAdd(setEditedGoal, setIsAddingGoal, setIsModalOpen)}
                    className="text-blue-500 hover:text-blue-700 flex items-center"
                >
                    <FaPlus />
                </button>
            </div>

            {dayGoals.length === 0 ? (
                <p className="text-gray-400">No goals for this day</p>
            ) : (
                <ul className="list-disc pl-4">
                    {dayGoals.map((goal, index) => (
                        <GoalListItem
                            key={index}
                            goal={goal}
                            onEdit={(goal) => handleEdit(goal, setEditedGoal, setIsAddingGoal, setIsModalOpen)}
                            onDelete={() => handleDelete(index)}
                            onToggle={handleToggle}
                        />
                    ))}
                </ul>
            )}

            {isModalOpen && (
                <GoalFormModal
                    goal={editedGoal}
                    onSave={(goal) => {
                        handleSave(goal, editedGoal);
                        setIsModalOpen(false);
                        setEditedGoal(null);
                    }}
                    onCancel={() => setIsModalOpen(false)}
                    isAddingGoal={isAddingGoal}
                />
            )}
        </div>
    );
}

