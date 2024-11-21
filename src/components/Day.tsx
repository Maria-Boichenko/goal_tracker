import React from "react";
import {Goal} from "../types/goals";

interface DayProps {
    openForm: (date: string) => void,
    date: string,
    goals: Goal[]
}

export function Day({openForm, date, goals}: DayProps) {
    return (
        <div
            key={date}
            className="p-4 border rounded-lg text-gray-800 bg-gray-100 cursor-pointer"
            onClick={() => openForm(date)}
        >
            <div className="font-serif">{date.split("-")[2]}</div>
            {/* Цели для конкретной даты */}
            <div className="font-serif text-sm text-blue-500">
                {(goals || []).map(goal => goal.title).join(", ")}
            </div>
        </div>
    );
}
