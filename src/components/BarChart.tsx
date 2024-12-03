import React from "react";
import { Bar } from "react-chartjs-2";
import { useChartData } from "../hooks/useChartData";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BarChart() {
    const chartData = useChartData();

    const chartOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top" as const,
                labels: {
                    font: {
                        size: 14,
                        weight: "bold" as const,
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Days of the Month",
                    font: {
                        size: 16,
                        weight: "bold" as const,
                    },
                },
                grid: {
                    color: "rgba(200, 200, 200, 0.2)",
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Completed Tasks",
                    font: {
                        size: 16,
                        weight: "bold" as const,
                    },
                },
                grid: {
                    color: "rgba(200, 200, 200, 0.2)",
                },
            },
        },
        elements: {
            point: {
                radius: 6,
                backgroundColor: "#4caf50",
                borderColor: "#388e3c",
                hoverRadius: 8,
            },
            line: {
                tension: 0.4,
                borderWidth: 3,
            },
        },
    };

    return (
        <div className="w-full h-[300px]">
            {chartData ? (
                <Bar
                    data={chartData}
                    options={chartOptions}
                />
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
}
