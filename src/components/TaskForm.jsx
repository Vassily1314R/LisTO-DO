import React, { useState } from "react";
import { TASK_STATUS } from "../data/taskStatus";
import styles from "./TaskForm.module.css";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("1");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(title, desc, dueDate, status);
    setTitle("");
    setDesc("");
    setDueDate("");
    setStatus("1");
  };

  return (
    <form className={styles.taskForm} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descripción"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        {TASK_STATUS.map((s) => (
          <option key={s.id} value={s.id}>
            {s.nombre}
          </option>
        ))}
      </select>
      <button type="submit">Agregar tarea</button>
    </form>
  );
};

export default TaskForm;
