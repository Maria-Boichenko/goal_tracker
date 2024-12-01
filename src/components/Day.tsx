import React from "react";
import { Goal } from "../types/goals";

interface DayProps {
    date: string;
    goals: Goal[];
    onDateClick: (date: string) => void;
}

export function Day({ date, goals, onDateClick }: DayProps) {
    // Получаем день месяца
    const day = new Date(date).getDate();

    return (
        <div
            key={date}
            className="p-4 border rounded-lg text-gray-800 bg-gray-100 cursor-pointer hover:bg-gray-200"
            onClick={() => onDateClick(date)}
        >
            {/* Отображение дня месяца */}
            <div className="font-serif text-lg 4 text-gray-700">{day}</div>

            {/* Отображение целей */}
            <div className="font-serif text-sm text-blue-500 mt-2">
                {goals.length > 0 ? (
                    <>
                        {/* Отображаем только первые 2 цели */}
                        {goals.slice(0, 2).map((goal, index) => (
                            <div key={index} className="truncate">
                                {goal.title}
                            </div>
                        ))}
                        {/* Если целей больше 2, добавляем информацию о дополнительных */}
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
