import React, { useState } from "react";
import { Day } from "./Day";
import { useTasks } from "../context/TaskProvider";
import {CalendarNavigation, WeekHeaders} from "./CalendarNavigation"

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function Calendar({ onDateClick }: { onDateClick: (date: string) => void }) {
    const { goals } = useTasks();
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Генерация дней месяца
    const generateDays = (
        length: number,
        offset: number,
        dateFactory: (day: number) => Date
    ) => Array.from({ length }, (_, i) => dateFactory(i + offset));

    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const daysInPreviousMonth = new Date(year, month, 0).getDate();

    const prevMonthDays = generateDays(firstDayOfWeek, daysInPreviousMonth - firstDayOfWeek + 1, (day) =>
        new Date(year, month - 1, day)
    );

    const currentMonthDays = generateDays(daysInCurrentMonth, 1, (day) =>
        new Date(year, month, day)
    );

    const nextMonthDays = generateDays(7 - ((prevMonthDays.length + currentMonthDays.length) % 7 || 7), 1, (day) =>
        new Date(year, month + 1, day)
    );

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
            <CalendarNavigation
                month={months[month]}
                year={year}
                onPrev={() => switchMonth("prev")}
                onNext={() => switchMonth("next")}
            />

            {/* Заголовки дней недели */}
            <WeekHeaders />

            {/* Дни месяца */}
            <div className="grid grid-cols-7 gap-2 mt-4">
                {/* Дни предыдущего месяца */}
                {prevMonthDays.map((date) => (
                    <Day
                        key={`prev-${date.getDate()}`}
                        date={date.toISOString().split("T")[0]}
                        goals={[]}
                        onDateClick={() => switchMonth("prev")}
                        inactive
                    />
                ))}

                {/* Дни текущего месяца */}
                {currentMonthDays.map((date) => {
                    const fullDate = date.toISOString().split("T")[0];
                    return (
                        <Day
                            key={`current-${date.getDate()}`}
                            date={fullDate}
                            goals={goals[fullDate] || []}
                            onDateClick={onDateClick}
                        />
                    );
                })}

                {/* Дни следующего месяца */}
                {nextMonthDays.map((date) => (
                    <Day
                        key={`next-${date.getDate()}`}
                        date={date.toISOString().split("T")[0]}
                        goals={[]}
                        onDateClick={() => switchMonth("next")}
                        inactive
                    />
                ))}
            </div>
        </div>
    );
}