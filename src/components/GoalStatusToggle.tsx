import React from "react";
import { Goal } from "../types/goals";

interface GoalStatusToggleProps {
    goal: Goal;
    onToggle: (goal: Goal) => void;
}

const priorityColors: { [key: string]: string } = {
    High: "bg-red-500 text-white border-red-500",
    Medium: "bg-yellow-400 text-gray-800 border-yellow-400",
    Low: "bg-green-400 text-gray-800 border-green-400",
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
