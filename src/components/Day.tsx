import React from "react";
import { Goal } from "../types/goals";

interface DayProps {
    date: string;
    goals: Goal[];
    onDateClick: (date: string) => void;
    inactive?: boolean;
}

export function Day({ date, goals, onDateClick, inactive }: DayProps) {
    const day = parseInt(date.split("-")[2], 10);

    const priorityColors: { [key: string]: string } = {
        High: "bg-red-500 text-white",
        Medium: "bg-yellow-400 text-gray-800",
        Low: "bg-green-400 text-gray-800",
    };

    const truncateText = (text: string, maxLength: number) =>
        text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

    return (
        <div
            className={`flex flex-col items-center justify-between border rounded-lg cursor-pointer hover:bg-gray-50 ${
                inactive ? "bg-gray-200 text-gray-400" : "bg-gray-100 hover:bg-blue-200"
            }`}
            onClick={() => onDateClick(date)}
            style={{
                width: "75px",
                height: "80px", // Чуть больше высота для удобства
            }}
        >
            {/* День месяца */}
            <div className="text-sm  mb-1">{day}</div>

            {/* Цели */}
            <div className="flex flex-col items-center justify-center gap-1 w-full px-1">
                {goals.slice(0, 2).map((goal, index) => (
                    <div
                        key={index}
                        className={`px-2 py-1 text-xs rounded-full border shadow-sm ${priorityColors[goal.priority]} truncate w-full text-center`}
                    >
                        {truncateText(goal.title, 8)}
                    </div>
                ))}
                {goals.length > 2 && (
                    <div className="text-xs text-gray-500 mt-1">+{goals.length - 2} more</div>
                )}
            </div>
        </div>
    );
}

