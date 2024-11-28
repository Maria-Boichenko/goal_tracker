import React, {useState} from "react";
import {Goal} from "../types/goals";
import Button from "./Button"
import Select from "./Select";

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
            <Select
                value={category}
                onChange={setCategory}
                options={[
                    {value: "Health", label: "Health"},
                    {value: "Work", label: "Work"},
                    {value: "Personal", label: "Personal"},
                ]}
                label="Category"
            />

            <Select
                value={priority}
                onChange={setPriority}
                options={[
                    {value: "High", label:"High"},
                    {value: "Medium", label: "Medium"},
                    {value: "Low", label: "Low"},
            ]}
            label="Priority"
            />
            <div className="font-serif flex justify-end" style={{gap: "12px"}}>
                <Button variant="secondary" onClick={onCancel}>
                   Cancel
               </Button>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </div>
        </form>
    );
}
