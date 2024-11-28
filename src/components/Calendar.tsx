import {  useState } from "react";
import GoalForm from "./GoalForm";
import { Goal } from "../types/goals";
import { Day } from "./Day";
import { useTasks } from "../context/TaskProvider";


interface CalendarProps {
    onDateClick: (date: string) => void; // Проп для обработки кликов на дату
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

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    // const [goals, setGoals] = useState<Record<string, Goal[]>>({});
    const { goals, setGoals } = useTasks();

    const openForm = (date: string) => {
        const formattedDate = new Date(date).toISOString().split("T")[0]; // Форматирование даты
        setSelectedDate(formattedDate);
        setIsFormOpen(true);
    };


    const closeForm = () => {
        setIsFormOpen(false);
        setSelectedDate(null);
    };

    const saveGoal = (goal: Goal) => {
        if (!selectedDate) return;

        const formattedDate = new Date(selectedDate).toISOString().split("T")[0]; // Преобразуем дату в формат YYYY-MM-DD

        setGoals((prev) => ({
            ...prev,
            [formattedDate]: [...(prev[formattedDate] || []), goal],
        }));
        closeForm();
    };



    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="grid grid-cols-7 gap-2 text-center font-bold text-gray-600">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2 mt-2">
                {/* <Day inactive={false} date={"2024-10-31"} /> */}
                {daysInMonth.map((date) => (
                    <Day key={date} date={date} goals={goals[date] || []} openForm={openForm} />
                ))}
                {/* <Day inactive={false} date={"2024-12-01"} /> */}
            </div>

            {isFormOpen && selectedDate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                        <GoalForm
                            date={selectedDate}
                            onSave={saveGoal}
                            onCancel={closeForm}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}


