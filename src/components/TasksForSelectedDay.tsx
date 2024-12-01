import React, { useState } from "react";
import { useTasks } from "../context/TaskProvider";
import { Goal } from "../types/goals";
import { FaPlus } from "react-icons/fa";
import GoalListItem from "./GoalListItem";
import GoalFormModal from "./GoalFormModal";

export default function TasksForSelectedDay({ selectedDate }: { selectedDate: string }) {
    const { goals, setGoals } = useTasks();
    const today = new Date().toISOString().split("T")[0];
    const todayGoals = goals[today] || [];
    const [editedGoals, setEditedGoals] = useState<Goal | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddingGoal, setIsAddingGoal] = useState(false);
    const dayGoals = goals[selectedDate] || [];

    const handleAdd = () => {
        setEditedGoals({
            title: "",
            description: "",
            category: "",
            priority: "Medium",
            date: today,
        });
        setIsAddingGoal(true);
        setIsModalOpen(true);
    };

    const handleDelete = (index: number) => {
        setGoals((prev) => {
            const updatedGoals = [...(prev[today] || [])];
            updatedGoals.splice(index, 1);
            return { ...prev, [today]: updatedGoals };
        });
    };

    const handleEdit = (goal: Goal) => {
        setEditedGoals(goal);
        setIsAddingGoal(false);
        setIsModalOpen(true);
    };

    const handleSave = (goal: Goal) => {
        const originalDate = editedGoals?.date || today;

        if (isAddingGoal) {
            setGoals((prev) => ({
                ...prev,
                [goal.date || today]: [...(prev[goal.date || today] || []), goal],
            }));
        } else {

            setGoals((prev) => {
                const updatedGoals = { ...prev };

                if (originalDate !== goal.date) {
                    updatedGoals[originalDate] = (prev[originalDate] || []).filter(
                        (g) => g.title !== editedGoals?.title
                    );
                }
                updatedGoals[goal.date || today] = [
                    ...(prev[goal.date || today] || []).filter((g) => g.title !== editedGoals?.title),
                    goal,
                ];
                return updatedGoals;
            });
        }
        setIsModalOpen(false);
        setEditedGoals(null);
    };


    return (
        <div>
            {/* Заголовок с кнопкой добавления */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold font-serif">
                    {isModalOpen && isAddingGoal ? "Add Goal" : `Goals for ${today}`}
                </h2>
                <button
                    onClick={handleAdd}
                    className="text-blue-500 hover:text-blue-700 flex items-center"
                >
                    <FaPlus className="mr-2" />

                </button>
            </div>

            {/* Список целей */}
            {todayGoals.length === 0 ? (
                <p className="text-gray-400">No goals for today</p>
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
                    goal={editedGoals}
                    onSave={handleSave}
                    onCancel={() => setIsModalOpen(false)}
                    isAddingGoal={isAddingGoal}
                />

            )}
        </div>
    );
}
