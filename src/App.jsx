// src/App.jsx
import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import { TASK_STATUS } from "./data/taskStatus";
import Modal from "./components/Modal";
import "./App.css";
import { useTareas } from "./domain/useTareas";
import { createTask, deleteTask, updateTask } from "./api/task.js";

const App = () => {
  const { data, loading, error, getTareas } = useTareas();
  const [viewTask, setViewTask] = useState(null);
  console.log(data);
  const closeModals = () => {
    setViewTask(null);
  };
  //  Crear tareas
  const handleAddTask = async (title, desc, dueDate, status) => {
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

  const handleEditTask = async (tarea) => {
    const datosEditados = {
      title: tarea.title,
      description: tarea.description,
      userId: 1,
      // También podrías incluir taskStatusId o completed si lo manejas
    };

    try {
      await updateTask(tarea.id, datosEditados);
      getTareas(); // Actualiza la lista visualmente
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  const handleChangeTaskStatus = async (taskId, nuevoStatusId) => {
    const tarea = data.find((t) => t.id === taskId);

    const tareaActualizada = {
      ...tarea,
      taskStatusId: nuevoStatusId,
    };
    try {
      await updateTask(taskId, tareaActualizada);
      getTareas(); // Actualiza la lista visualmente
      console.log("Tarea actualizada:", tareaActualizada);
    } catch (error) {
      console.error("Error al actualizar el estado de la tarea:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      getTareas();
    } catch {
      console.error("Error al actualizar el estado de la tarea:", error);
    }
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
          <p>Entrega: {viewTask.createAt}</p>
          <p>Estado: {viewTask.taskStatus.name}</p>
        </Modal>
      )}
    </div>
  );
};

export default App;
