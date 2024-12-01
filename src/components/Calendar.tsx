import { useState } from "react";
import { useTasks } from "../context/TaskProvider";
import { Day } from "./Day";

interface CalendarProps {
    onDateClick: (date: string) => void; // Обработчик выбора даты
}

export default function Calendar({ onDateClick }: CalendarProps) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const daysInCurrentMonth = new Date(year, month, 0).getDate();

    const daysInMonth = Array.from(
        { length: daysInCurrentMonth },
        (_, i) => `${year}-${String(month).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`
    );

    const { goals } = useTasks(); // Получение задач из контекста

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            {/* Заголовки дней недели */}
            <div className="grid grid-cols-7 gap-2 text-center font-bold text-gray-600">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            {/* Календарь */}
            <div className="grid grid-cols-7 gap-2 mt-2">
                {daysInMonth.map((date) => (
                    <Day
                        key={date}
                        date={date}
                        goals={goals[date] || []} // Передача задач для текущего дня
                        onDateClick={onDateClick} // Выбор даты при клике
                    />
                ))}
            </div>
        </div>
    );
}


