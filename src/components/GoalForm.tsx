import React, {useState} from "react";
import {Goal} from "../types/goals";

interface GoalFormProps {
    onSave: (goal: Goal) => void;
    onCancel: () => void;
    date: string;
}

export default function GoalForm({onSave, onCancel}: GoalFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Personal");
    const [priority, setPriority] = useState("Medium");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({title, description, category, priority});
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
        >
            <h2 className=" font-serif text-xl font-bold mb-4">Add Goal</h2>
            <div className="mb-4">
                <label className="font-serif block font-medium mb-2">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="font-serif block font-medium mb-2">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                />
            </div>
            <div className="mb-4">
                <label className="font-serif block font-medium mb-2">Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                >
                    <option className="font-serif" value="Health">Health</option>
                    <option className="font-serif" value="Work">Work</option>
                    <option className="font-serif" value="Personal">Personal</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="font-serif block font-medium mb-2">Priority</label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                >
                    <option className="font-serif" value="High">High</option>
                    <option className="font-serif" value="Medium">Medium</option>
                    <option className="font-serif" value="Low">Low</option>
                </select>
            </div>
            <div className="font-serif flex justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    className="mr-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                    Save
                </button>
            </div>
        </form>
    );
}
