import React, { useState } from "react";
import { TASK_STATUS } from "../data/taskStatus";
import styles from "./TaskForm.module.css";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Programada");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({
      id: Date.now(),
      title,
      description: desc,
      dueDate,
      status,
    });

    setTitle("");
    setDesc("");
    setDueDate("");
    setStatus("Programada");
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
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <button type="submit">Agregar tarea</button>
    </form>
  );
};

export default TaskForm;
