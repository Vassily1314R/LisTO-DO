import TaskCard from "./TaskCard";
import styles from "./TaskColumn.module.css";

const TaskColumn = ({ title, tasks, onView, onEdit, onChangeStatus }) => {
  const columnClass = `${styles.taskColumn} ${styles[title.toLowerCase()]}`;

  return (
    <div className={columnClass}>
      <h3>{title}</h3>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onView={onView}
          onEdit={onEdit}
          onChangeStatus={onChangeStatus}
        />
      ))}
    </div>
  );
};

export default TaskColumn;
