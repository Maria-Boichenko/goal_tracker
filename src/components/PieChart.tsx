import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { useTasks } from "../context/TaskProvider";
import { Goal } from "../types/goals";

// Регистрация компонентов Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
    const { goals } = useTasks();

    // Сбор данных для всего месяца
    const taskData = useMemo(() => {
        const priorities = { High: 0, Medium: 0, Low: 0 };

        Object.values(goals).forEach((dayGoals) => {
            dayGoals.forEach((goal: Goal) => {
                if (goal.priority in priorities) {
                    priorities[goal.priority]++;
                }
            });
        });

        return priorities;
    }, [goals]);

    // Подготовка данных для графика
    const data = {
        labels: ["High Priority", "Medium Priority", "Low Priority"],
        datasets: [
            {
                label: "Task Priorities",
                data: [taskData.High, taskData.Medium, taskData.Low],
                backgroundColor: ["#f87171", "#facc15", "#4ade80"], // Цвета для приоритетов
                hoverBackgroundColor: ["#fca5a5", "#fde047", "#86efac"], // Цвета при наведении
            },
        ],
    };

    return (
        <div className="w-full h-full p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4 text-center">Monthly Task Priorities</h2>
            <Pie data={data} />
        </div>
    );
}
