import styles from "./TaskCard.module.css";

const TaskCard = ({ task }) => {
  return (
    <div className={styles.taskCard}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <small>Entrega: {task.dueDate}</small>
    </div>
  );
};

export default TaskCard;
