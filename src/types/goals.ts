
export interface Goal {
    title: string;
    description: string;
    category: string;
    priority: "High" | "Medium" | "Low";
    date?: string;
}