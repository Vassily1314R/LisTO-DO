import styles from "./TaskCard.module.css";

const TaskCard = ({ task, onView, onEdit, onChangeStatus }) => {
  return (
    <div className={styles.taskCard}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <small>Entrega: {task.dueDate}</small>

      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={() => onView(task)}>
          Ver
        </button>
        <button className={styles.button} onClick={() => onEdit(task)}>
          Editar
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
    </div>
  );
};

export default TaskCard;
