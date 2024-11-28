import React from "react";

interface Task {
    title: string;
    priority: "High" | "Medium" | "Low";
}

interface TasksForSelectedDayProps {
    tasks: Record<string, Task[]>; // Все задачи
    setTasks: React.Dispatch<React.SetStateAction<Record<string, Task[]>>>; // Функция для обновления задач
}

export default function TasksForSelectedDay({

                                            }: TasksForSelectedDayProps) {
    const { goals: tasks, setGoals: setTasks } = useTasks();
    const today = new Date().toISOString().split("T")[0]; // Сегодняшняя дата
    const todayTasks = tasks[today] || [];
console.log('today', today, tasks, todayTasks);


    const handleDelete = (index: number) => {
        setTasks((prev) => {
            const updatedTasks = [...(prev[today] || [])];
            updatedTasks.splice(index, 1);
            return {...prev, [today]: updatedTasks};
        });
    };

    return (
        <div>
            <h2 className="text-lg font-bold font-serif mb-4">Tasks for {today}</h2>
            {todayTasks.length === 0 ? (
                <p className="text-gray-400">No tasks for today</p>
            ) : (
                <ul className="list-disc pl-4">
                    {todayTasks.map((task, index) => (
                        <li key={index} className="mb-2 flex justify-between items-center">
                            <div>
                                <span className="font-bold">{task.title}</span> -{" "}
                                <span className="text-sm text-gray-500">{task.priority}</span>
                            </div>
                            <button
                                onClick={() => handleDelete(index)}
                                className="text-red-500 hover:underline"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

