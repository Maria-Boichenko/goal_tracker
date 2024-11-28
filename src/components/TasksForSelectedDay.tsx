import React, { useState } from "react";
import Button from "./Button";
import Select from "./Select";
import {useTasks} from "../context/TaskProvider";
import {Goal} from "../types/goals";

interface TasksForSelectedDayProps {

}

export default function TasksForSelectedDay({

                                            }: TasksForSelectedDayProps) {
    const { goals: tasks, setGoals: setTasks } = useTasks();
    const today = new Date().toISOString().split("T")[0]; // Сегодняшняя дата
    const todayTasks = tasks[today] || [];
console.log('today', today, tasks, todayTasks);


    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedTask, setEditedTask] = useState<Goal | null>(null);

    const handleDelete = (index: number) => {
        setTasks((prev) => {
            const updatedTasks = [...(prev[today] || [])];
            updatedTasks.splice(index, 1);
            return { ...prev, [today]: updatedTasks };
        });
    };

    const handleEdit = (index: number) => {
        setEditingIndex(index);
        setEditedTask(todayTasks[index]);
    };

    const handleSave = () => {
        if (editingIndex === null || !editedTask) return;
        setTasks((prev) => {
            const updatedTasks = [...(prev[today] || [])];
            updatedTasks[editingIndex] = editedTask;
            return { ...prev, [today]: updatedTasks };
        });
        setEditingIndex(null);
        setEditedTask(null);
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
                            {editingIndex === index ? (
                                <div className="flex items-center gap-2 w-full">
                                    {/* Этот код можно удалить после того, как редактирование будет в модальном окне */}
                                    <input
                                        type="text"
                                        value={editedTask?.title || ""}
                                        onChange={(e) =>
                                            setEditedTask((prev) => ({
                                                ...(prev || task),
                                                title: e.target.value,
                                            }))
                                        }
                                        className="border border-gray-300 rounded-lg px-2 py-1 flex-grow"
                                    />
                                    <Select
                                        value={editedTask?.priority || "Medium"}
                                        onChange={(value) =>
                                            setEditedTask((prev) => ({
                                                ...(prev || task),
                                                priority: value as "High" | "Medium" | "Low",
                                            }))
                                        }
                                        options={[
                                            { value: "High", label: "High" },
                                            { value: "Medium", label: "Medium" },
                                            { value: "Low", label: "Low" },
                                        ]}
                                    />
                                    <Button onClick={handleSave} variant="primary">
                                        Save
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setEditingIndex(null);
                                            setEditedTask(null);
                                        }}
                                        variant="secondary"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4 w-full justify-between">
                            {/* Вынести в отдельный компонент */}
                                    <div>
                                        <span className="font-bold">{task.title}</span>{" "}
                                        -{" "}
                                        <span
                                            className={`text-sm ${
                                                task.priority === "High"
                                                    ? "text-red-500"
                                                    : task.priority === "Medium"
                                                        ? "text-yellow-500"
                                                        : "text-green-500"
                                            }`}
                                        >
                                            {task.priority}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button onClick={() => handleEdit(index)} variant="primary">
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(index)}
                                            variant="danger"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}



