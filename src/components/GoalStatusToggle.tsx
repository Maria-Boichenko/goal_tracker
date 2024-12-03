import React from "react";
import { Goal } from "../types/goals";

interface GoalStatusToggleProps {
    goal: Goal;
    onToggle: (goal: Goal) => void;
}

const priorityColors: { [key: string]: string } = {
    High: "bg-red-300 text-gray-800 border-red-500",
    Medium: "bg-yellow-300 text-gray-800 border-yellow-500",
    Low: "bg-green-300 text-gray-800 border-green-500",
};

export default function GoalStatusToggle({ goal, onToggle }: GoalStatusToggleProps) {
    return (
        <div className="flex items-center gap-2 w-full">
            <input
                type="checkbox"
                checked={goal.completed}
                onChange={() => onToggle({ ...goal, completed: !goal.completed })}
                className="cursor-pointer"
            />
            <span
                className={`px-3 py-1 border ${priorityColors[goal.priority]} rounded-full text-sm font-medium truncate ${
                    goal.completed ? "line-through text-gray-400 border-gray-400" : ""
                }`}
            >
                {goal.title}
            </span>
        </div>
    );
}
