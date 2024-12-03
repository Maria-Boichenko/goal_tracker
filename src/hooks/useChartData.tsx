import { useMemo } from "react";
import { useTasks } from "../context/TaskProvider";

export const useChartData = () => {
    const { goals } = useTasks();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const chartData = useMemo(() => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const labels = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
        const completedTasksPerDay = Array(daysInMonth).fill(0);

        // Подсчет выполненных задач
        Object.keys(goals).forEach((date) => {
            const [yearGoal, monthGoal, dayGoal] = date.split("-").map(Number);
            if (yearGoal === year && monthGoal === month + 1) {
                const completedGoals = goals[date].filter((goal) => goal.completed);
                completedTasksPerDay[dayGoal - 1] = completedGoals.length;
            }
        });

        return {
            labels,
            datasets: [
                {
                    label: "Completed Tasks",
                    data: completedTasksPerDay,
                    borderColor: "#4caf50",
                    backgroundColor: "rgba(76, 175, 80, 0.2)",
                    tension: 0.4,
                    fill: true,
                },
            ],
        };
    }, [goals, month, year]);

    return chartData;
};
