import React from 'react';
import './App.css';
import './index.css'
import Home from "./pages/Home";
import { TasksProvider } from "./context/TaskProvider"

// import DarkModeToggle from "./pages/DarkModeToggle";

function App() {
    return (
        <div>
            <TasksProvider>
                <Home/>
            </TasksProvider>
        </div>
    );
}

export default App;





