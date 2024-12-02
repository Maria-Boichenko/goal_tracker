import React from "react";
import { Goal } from "../types/goals";

interface GoalListProps {
    goals: Goal[];
    maxDisplay?: number; // Количество отображаемых целей
}

export function GoalList({ goals, maxDisplay = 2 }: GoalListProps) {
    const priorityColors: { [key: string]: string } = {
        High: "bg-red-500 text-white",
        Medium: "bg-yellow-400 text-gray-800",
        Low: "bg-green-400 text-gray-800",
    };

    const truncateText = (text: string, maxLength: number) =>
        text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

    return (
        <div
            className={`flex ${
                goals.length === 1
                    ? "items-center justify-center" // Центрируем, если одна задача
                    : "flex-col items-center gap-1"
            } w-full overflow-hidden`}
            style={{ height: "45px" }} // Фиксированная высота для задач
        >
            {goals.slice(0, maxDisplay).map((goal, index) => (
                <div
                    key={index}
                    className={`flex items-center justify-center px-2 py-1 text-xs rounded-full border shadow-sm ${priorityColors[goal.priority]} truncate text-center`}
                    style={{
                        width: "90%",
                        height: "20px",
                        lineHeight: "20px", // Центрируем текст внутри задачи
                    }}
                >
                    {truncateText(goal.title, 8)}
                </div>
            ))}
            {goals.length > maxDisplay && (
                <div className="text-xs text-gray-500">+{goals.length - maxDisplay} more</div>
            )}
        </div>
    );
}
