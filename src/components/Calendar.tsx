import React, { useState } from "react";
import { Goal } from "../types/goals";
import { Day } from "./Day";
import { useTasks } from "../context/TaskProvider";

interface CalendarProps {
    onDateClick: (date: string) => void; // Проп для обработки кликов на дату
}

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function Calendar({ onDateClick }: CalendarProps) {
    const { goals } = useTasks();
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Получаем количество дней в текущем месяце
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

    // Получаем день недели для первого числа месяца
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    // Получаем количество дней в предыдущем месяце
    const daysInPreviousMonth = new Date(year, month, 0).getDate();

    // Создаем массив дней для предыдущего, текущего и следующего месяцев
    const prevMonthDays = Array.from(
        { length: firstDayOfWeek },
        (_, i) => daysInPreviousMonth - firstDayOfWeek + i + 1
    );

    const currentMonthDays = Array.from(
        { length: daysInCurrentMonth },
        (_, i) => i + 1
    );

    const nextMonthDays = Array.from(
        { length: 7 - ((prevMonthDays.length + currentMonthDays.length) % 7 || 7) },
        (_, i) => i + 1
    );

    // Функция переключения месяца
    const switchMonth = (direction: "prev" | "next") => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
            return newDate;
        });
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            {/* Навигация по месяцам */}
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => switchMonth("prev")}
                    className="text-gray-600 hover:text-gray-900"
                >
                    ←
                </button>
                <h2 className="text-lg font-bold">
                    {months[month]} {year}
                </h2>
                <button
                    onClick={() => switchMonth("next")}
                    className="text-gray-600 hover:text-gray-900"
                >
                    →
                </button>
            </div>

            {/* Заголовки дней недели */}
            <div className="grid grid-cols-7 gap-2 text-center font-bold text-gray-600">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            {/* Дни месяца */}
            <div className="grid grid-cols-7 gap-2 mt-4">
                {/* Дни предыдущего месяца */}
                {prevMonthDays.map((day) => (
                    <Day
                        key={`prev-${day}`}
                        date={new Date(year, month - 1, day).toISOString().split("T")[0]}
                        goals={[]}
                        onDateClick={() => switchMonth("prev")}
                        inactive
                    />
                ))}

                {/* Дни текущего месяца */}
                {currentMonthDays.map((day) => {
                    const fullDate = new Date(year, month, day).toISOString().split("T")[0];
                    return (
                        <Day
                            key={`current-${day}`}
                            date={fullDate}
                            goals={goals[fullDate] || []}
                            onDateClick={onDateClick}
                        />
                    );
                })}

                {/* Дни следующего месяца */}
                {nextMonthDays.map((day) => (
                    <Day
                        key={`next-${day}`}
                        date={new Date(year, month + 1, day).toISOString().split("T")[0]}
                        goals={[]}
                        onDateClick={() => switchMonth("next")}
                        inactive
                    />
                ))}
            </div>
        </div>
    );
}
