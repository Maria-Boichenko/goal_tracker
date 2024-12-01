import React from "react";
import { Goal } from "../types/goals";

interface DayProps {
    date: string;
    goals: Goal[];
    onDateClick: (date: string) => void;
    inactive?: boolean;
}

export function Day({ date, goals, onDateClick, inactive }: DayProps) {
    // Получаем день месяца безопасным способом
    const day = parseInt(date.split("-")[2], 10); // Извлекаем день из строки даты

    return (
        <div
            className={`p-4 border rounded-lg text-gray-800 cursor-pointer ${
                inactive ? "bg-gray-200 text-gray-400" : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => onDateClick(date)}
        >
            {/* Отображение дня месяца */}
            <div className="font-serif text-lg text-gray-700">{day}</div>

            {/* Отображение целей */}
            <div className="font-serif text-sm text-blue-500 mt-2">
                {goals.length > 0 ? (
                    <>
                        {goals.slice(0, 2).map((goal, index) => (
                            <div key={index} className="truncate">
                                {goal.title}
                            </div>
                        ))}
                        {goals.length > 2 && (
                            <div className="text-gray-400">+{goals.length - 2} more</div>
                        )}
                    </>
                ) : (
                    <div className="text-gray-400"></div>
                )}
            </div>
        </div>
    );
}
