// src/App.jsx
import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import { TASK_STATUS } from "./data/taskStatus";
import "./App.css"; // asegúrate de importar el CSS

const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div className="app-container">
      <h2>Gestión de Tareas</h2>
      <TaskForm onAddTask={handleAddTask} />

      <div className="task-columns">
        {TASK_STATUS.map((status) => (
          <TaskColumn
            key={status}
            title={status}
            tasks={tasks.filter((task) => task.status === status)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
