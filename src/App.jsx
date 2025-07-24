// src/App.jsx
import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import { TASK_STATUS } from "./data/taskStatus";
import Modal from "./components/Modal";
import "./App.css";
import { useTareas } from "./domain/useTareas";
import { createTask } from "./api/task.js";

const App = () => {
  const { data, loading, error, getTareas } = useTareas();
  const [tasks, setTasks] = useState([]);
  const [viewTask, setViewTask] = useState(null);
  console.log(data);
  const closeModals = () => {
    setViewTask(null);
  };
  //  Crear tareas
  const handleAddTask = async (title, desc, dueDate, status) => {
    // convertir status a int

    const nuevaTarea = {
      title,
      description: desc,
      userId: 1,
      taskStatusId: parseInt(status, 10), // Convertir a entero
      createAt: new Date(dueDate),
    };
    console.log(nuevaTarea);
    try {
      const response = await createTask(nuevaTarea);
      console.log("Tarea creada:", response.data);

      if (response.data) {
        getTareas(); // Actualiza la lista visualmente
      }
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
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
              key={status.nombre}
              title={status.nombre}
              tasks={data?.filter(
                (task) => task.taskStatus.name === status.nombre
              )}
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
