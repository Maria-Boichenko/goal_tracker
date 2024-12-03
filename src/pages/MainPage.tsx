import React, { useState } from "react";
import Calendar from "../components/Calendar";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import TasksForSelectedDay from "../components/TasksForSelectedDay";


export default function MainPage() {
       const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);

    // Обработчик выбора даты
    const handleDateClick = (date: string) => {
        setSelectedDate(date);
    };

  return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {/* Календарь */}
            <div className="col-span-3 md:col-span-2 bg-white rounded-lg shadow-md p-4">
                <Calendar onDateClick={handleDateClick} />
            </div>

            {/* Список задач */}
            <div className="col-span-1 bg-white rounded-lg shadow-md p-4">
                <TasksForSelectedDay selectedDate={selectedDate}  />
            </div>

            {/* Правая колонка (Progress и Analytics) */}
            <div className=" col-span-5 grid grid-cols-2 gap-4 h-full">
                {/* Progress */}
                <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
                    <h2 className="text-lg font-bold font-serif mb-2">Progress</h2>
                    <div>
                        <LineChart />
                    </div>
                </div>

                {/* Analytics */}
                <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center">
                    <h2 className="text-lg font-bold">Analytics</h2>
                    <div className="flex-grow">
                        <PieChart />
                    </div>
                </div>
            </div>
        </div>
    );
}


