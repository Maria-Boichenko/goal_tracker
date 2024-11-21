import React, {useState} from "react";
import GoalForm from "./GoalForm";

interface CalendarProps {
    onDateClick: (date: string) => void; // Проп для обработки кликов на дату
}

export default function Calendar({onDateClick}: CalendarProps) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysInMonth = Array.from({length: 30}, (_, i) => i + 1);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [goals, setGoals] = useState<Record<string, string[]>>({});

    // Открытие формы с установкой выбранной даты
    const openForm = (date: string) => {
        setSelectedDate(date);
        setIsFormOpen(true);
    };

    // Закрытие формы
    const closeForm = () => {
        setIsFormOpen(false);
        setSelectedDate(null);
    };

    // Сохранение цели
    const saveGoal = (goal: { title: string }) => {
        if (!selectedDate) return;
        setGoals((prev) => ({
            ...prev,
            [selectedDate]: [...(prev[selectedDate] || []), goal.title],
        }));
        closeForm();
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            {/* Заголовок дней недели */}
            <div className="grid grid-cols-7 gap-2 text-center font-bold text-gray-600">
                {daysOfWeek.map((day) => (
                    <div key={day}>{day}</div>
                ))}
            </div>

            {/* Календарь */}
            <div className="grid grid-cols-7 gap-2 mt-2">
                {daysInMonth.map((day) => {
                    const date = `2024-11-${day.toString().padStart(2, "0")}`;
                    return (
                        <div
                            key={day}
                            className="p-4 border rounded-lg text-gray-800 bg-gray-100 cursor-pointer"
                            onClick={() => openForm(date)}
                        >
                            <div className="font-serif">{day}</div>
                            {/* Цели для конкретной даты */}
                            <div className="font-serif text-sm text-blue-500">
                                {(goals[date] || []).join(", ")}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Модальное окно */}
            {isFormOpen && selectedDate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                        <GoalForm
                            date={selectedDate} // Передача выбранной даты
                            onSave={saveGoal}
                            onCancel={closeForm}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}


