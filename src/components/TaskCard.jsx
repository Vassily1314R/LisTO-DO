import { useState } from "react";
import styles from "./TaskCard.module.css";

const TaskCard = ({ task, onView, onEdit, onChangeStatus, onDelete }) => {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [tituloEditado, setTituloEditado] = useState(task.title);
  const [descripcionEditada, setDescripcionEditada] = useState(
    task.description
  );
  // Desestructuramos los array que usaremos mas adelante

  const guardarCambios = () => {
    if (descripcionEditada === "" || tituloEditado === "") return;
    const tareaEditada = {
      ...task,
      title: tituloEditado,
      description: descripcionEditada,
    };
    onEdit(tareaEditada); // enviamos la tarea al padre
    setModoEdicion(false);
  };

  const cancelar = () => {
    setTituloEditado(task.title);
    setDescripcionEditada(task.description);
    setModoEdicion(false);
    // Restaurar valores originales
  };

  return (
    <div className={styles.taskCard}>
      {modoEdicion ? (
        <div className={styles.inputs}>
          <input
            type="text"
            value={tituloEditado}
            onChange={(e) => setTituloEditado(e.target.value)}
            required
          />
          <textarea
            value={descripcionEditada}
            onChange={(e) => setDescripcionEditada(e.target.value)}
            rows={10}
          />
          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={guardarCambios}>
              Guardar
            </button>
            <button className={styles.button} onClick={cancelar}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <h4>{task.title}</h4>
          <p className={styles.descript}>{task.description}</p>
          <small>Entrega: {task.createAt}</small>

          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={() => onView(task)}>
              Ver
            </button>
            <button
              className={styles.button}
              onClick={() => setModoEdicion(true)}
            >
              Editar
            </button>
            <button className={styles.button} onClick={() => onDelete(task.id)}>
              Eliminar
            </button>
            <select
              className={styles.select}
              value={task.taskStatus.id}
              onChange={(e) =>
                onChangeStatus(task.id, parseInt(e.target.value, 10))
              }
            >
              <option value="1">Programada</option>
              <option value="2">Ejecutada</option>
              <option value="3">Reprogramada</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
