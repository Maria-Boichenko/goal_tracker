import React from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

// Регистрация компонентов Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ["Work", "Personal", "Health"], // Категории задач
    datasets: [
        {
            label: "Task Distribution",
            data: [40, 35, 25], // Процентное распределение задач
            backgroundColor: ["#4caf50", "#2196f3", "#ff9800"], // Цвета
            hoverBackgroundColor: ["#66bb6a", "#42a5f5", "#ffb74d"], // Цвета при наведении
        },
    ],
};

export default function PieChart() {
    return (
        <div className="w-full h-full">
            <Pie data={data} />
        </div>
    );
}
