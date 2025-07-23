// src/App.jsx
import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import { TASK_STATUS } from "./data/taskStatus";
import Modal from "./components/Modal";
import "./App.css";

const App = () => {
  const { data, loading, error, getTareas } = useTareas();
  const [tasks, setTasks] = useState([]);
  const [viewTask, setViewTask] = useState(null);

  const handleAddTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const closeModals = () => {
    setViewTask(null);
  };

  const handleEditTask = (tareaEditada) => {
    const tareasActualizadas = tasks.map((t) =>
      t.id === tareaEditada.id ? tareaEditada : t
    );
    setTasks(tareasActualizadas);
  };

  const handleChangeTaskStatus = (taskId, nuevoEstado) => {
    const tareasActualizadas = tasks.map((t) =>
      t.id === taskId ? { ...t, status: nuevoEstado } : t
    );
    setTasks(tareasActualizadas);
  };

  const handleDeleteTask = (taskId) => {
    const tareasActualizadas = tasks.filter((t) => t.id !== taskId);
    setTasks(tareasActualizadas);
  };

  return (
    <div className="app-container">
      <header>
        <h2>Gestión de Tareas</h2>
        <TaskForm onAddTask={handleAddTask} />
      </header>
      <main>
        <div className="task-columns">
          {TASK_STATUS.map((status) => (
            <TaskColumn
              key={status}
              title={status}
              tasks={tasks.filter((task) => task.status === status)}
              onView={setViewTask}
              onEdit={handleEditTask}
              onChangeStatus={handleChangeTaskStatus}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      </main>
      {viewTask && (
        <Modal onClose={closeModals}>
          <h2>{viewTask.title}</h2>
          <p>{viewTask.description}</p>
          <p>Entrega: {viewTask.dueDate}</p>
          <p>Estado: {viewTask.status}</p>
        </Modal>
      )}
    </div>
  );
};

export default App;
