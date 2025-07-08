// src/App.jsx
import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import { TASK_STATUS } from "./data/taskStatus";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Gestión de Tareas</h2>
      <TaskForm onAddTask={handleAddTask} />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
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
