import TaskCard from "./TaskCard";
import styles from "./TaskColumn.module.css";

const TaskColumn = ({ title, tasks }) => {
  const columnClass = `${styles.taskColumn} ${styles[title.toLowerCase()]}`;

  return (
    <div className={columnClass}>
      <h3>{title}</h3>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskColumn;
