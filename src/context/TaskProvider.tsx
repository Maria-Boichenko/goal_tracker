import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Goal } from "../types/goals";

interface TasksContextType {
    goals: Record<string, Goal[]>;
    setGoals: React.Dispatch<React.SetStateAction<Record<string, Goal[]>>>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
    const [goals, setGoals] = useState<Record<string, Goal[]>>(() => {
        const savedGoals = localStorage.getItem("goals");
        return savedGoals ? JSON.parse(savedGoals) : {};
    });

    useEffect(() => {
        localStorage.setItem("goals", JSON.stringify(goals));
    }, [goals]);

    return (
        <TasksContext.Provider value={{ goals, setGoals }}>
            {children}
        </TasksContext.Provider>
    );
}

export function useTasks() {
    const context = useContext(TasksContext);
    if (!context) {
        throw new Error("useTasks must be used within a TasksProvider");
    }
    return context;
}
