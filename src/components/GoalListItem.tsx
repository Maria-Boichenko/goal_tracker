import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Goal } from "../types/goals";

interface GoalListItemProps {
    goal: Goal;
    onEdit: (goal: Goal) => void;
    onDelete: () => void;
}

export default function GoalListItem({ goal, onEdit, onDelete }: GoalListItemProps) {
    return (
        <li className="mb-2 flex justify-between items-center">
            <div>
                <span className="">{goal.title}</span> -{" "}
                <span
                    className={`text-sm ${
                        goal.priority === "High"
                            ? "text-red-500"
                            : goal.priority === "Medium"
                                ? "text-yellow-500"
                                : "text-green-500"
                    }`}
                >
                    {goal.priority}
                </span>
            </div>
            <div className="flex gap-2">
                {/* Редактирование */}
                <button
                    onClick={() => onEdit(goal)}
                    className="text-blue-500 hover:text-blue-700"
                >
                    <FaEdit />
                </button>
                {/* Удаление */}
                <button
                    onClick={onDelete}
                    className="text-red-500 hover:text-red-700"
                >
                    <FaTrash />
                </button>
            </div>
        </li>
    );
}

