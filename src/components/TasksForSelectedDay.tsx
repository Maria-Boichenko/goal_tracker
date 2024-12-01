import React, { useState } from "react";
import Button from "./Button";
import Select from "./Select";
import { useTasks } from "../context/TaskProvider";
import { Goal } from "../types/goals";
import Modal from "./Modal";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function TasksForSelectedDay() {
    const { goals, setGoals } = useTasks();
    const today = new Date().toISOString().split("T")[0];
    const todayGoals = goals[today] || [];
    const [editedGoals, setEditedGoals] = useState<Goal | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = (index: number) => {
        setGoals((prev) => {
            const updatedGoals = [...(prev[today] || [])];
            updatedGoals.splice(index, 1);
            return { ...prev, [today]: updatedGoals };
        });
    };

    const handleEdit = (goal: Goal) => {
        setEditedGoals(goal);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (editedGoals) {
            setGoals((prev) => ({
                ...prev,
                [today]: (prev[today] || []).map((task) =>
                    task.title === editedGoals.title ? editedGoals : task
                ),
            }));
        }
        setIsModalOpen(false);
        setEditedGoals(null);
    };

    return (
        <div>
            <h2 className="text-lg font-bold font-serif mb-4">Tasks for {today}</h2>
            {todayGoals.length === 0 ? (
                <p className="text-gray-400">No tasks for today</p>
            ) : (
                <ul className="list-disc pl-4">
                    {todayGoals.map((goal, index) => (
                        <li
                            key={index}
                            className="mb-2 flex justify-between items-center"
                        >
                            <div>
                                <span className="font-bold">{goal.title}</span> -{" "}
                                <span
                                    className={`text-sm ${
                                        goal.priority === "High"
                                            ? "text-red-500"
                                            : goal.priority === "Medium"
                                                ? "text-yellow-500"
                                                : "text-green-500"
                                    }`}
                                >
                                    {goal.priority}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(goal)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {isModalOpen && editedGoals && (
                <Modal onClose={() => setEditedGoals(null)}>
                    <h2 className="text-lg font-bold font-serif mb-4">Edit Task</h2>
                    <div className="mb-4">
                        <label className="block mb-2">Title</label>
                        <input
                            type="text"
                            value={editedGoals.title}
                            onChange={(e) =>
                                setEditedGoals((prev) => ({
                                    ...(prev || { title: "", priority: "Medium", date: today }),
                                    title: e.target.value,
                                }))
                            }
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Priority</label>
                        <Select
                            value={editedGoals.priority || "Medium"}
                            onChange={(value) =>
                                setEditedGoals((prev) => ({
                                    ...(prev || { title: "", priority: "Medium", date: today }),
                                    priority: value as "High" | "Medium" | "Low",
                                }))
                            }
                            options={[
                                { value: "High", label: "High" },
                                { value: "Medium", label: "Medium" },
                                { value: "Low", label: "Low" },
                            ]}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Date</label>
                        <input
                            type="date"
                            value={editedGoals.date || today}
                            onChange={(e) =>
                                setEditedGoals((prev) => ({
                                    ...(prev || { title: "", priority: "Medium", date: today }),
                                    date: e.target.value,
                                }))
                            }
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button onClick={handleSave} variant="primary">
                            Save
                        </Button>
                        <Button
                            onClick={() => setEditedGoals(null)}
                            variant="secondary"
                        >
                            Cancel
                        </Button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

