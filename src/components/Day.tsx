import React from "react";
import { Goal } from "../types/goals";
import { GoalList } from "./GoalList";

interface DayProps {
    date: string;
    onDateClick: (date: string) => void;
    goals: Goal[];
    inactive?: boolean;
}

export function Day({ date, goals, onDateClick, inactive }: DayProps) {
    const day = parseInt(date.split("-")[2], 10);

    return (
        <div
            className={`flex flex-col justify-between border rounded-lg cursor-pointer hover:bg-blue-100 ${
                inactive ? "bg-gray-200 text-grey-400" : "bg-gray-100 "
            }`}
            onClick={() => onDateClick(date)}
            style={{
                width: "75px",
                height: "75px",
            }}
        >
            {/* День месяца */}
            <div className="text-sm text-center">{day}</div>

            {/* Отображение задач */}
            <GoalList goals={goals} maxDisplay={2} /> {/* Передаем реальные задачи */}
        </div>
    );
}
