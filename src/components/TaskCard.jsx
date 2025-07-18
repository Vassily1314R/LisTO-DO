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
      // Guardamos los cambios que luego se envian al padre
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
          <small>Entrega: {task.dueDate}</small>

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
              value={task.status}
              onChange={(e) => onChangeStatus(task.id, e.target.value)}
            >
              <option value="Programada">Programada</option>
              <option value="Ejecutada">Ejecutada</option>
              <option value="Reprogramada">Reprogramada</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
