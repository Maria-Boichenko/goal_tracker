import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Goal } from "../types/goals";
import GoalStatusToggle from "./GoalStatusToggle";

interface GoalListItemProps {
    goal: Goal;
    onEdit: (goal: Goal) => void;
    onDelete: () => void;
    onToggle: (goal: Goal) => void;
}

export default function GoalListItem({ goal, onEdit, onDelete, onToggle }: GoalListItemProps) {
    return (
        <li className="mb-2 flex justify-between items-center">
            <GoalStatusToggle goal={goal} onToggle={onToggle} />
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onEdit(goal)}
                    className="text-blue-500 hover:text-blue-700"
                >
                    <FaEdit />
                </button>
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


