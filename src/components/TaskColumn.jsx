import TaskCard from "./TaskCard";
import styles from "./TaskColumn.module.css";

const TaskColumn = ({
  title,
  tasks,
  onView,
  onEdit,
  onChangeStatus,
  onDelete,
}) => {
  const columnClass = `${styles.taskColumn} ${styles[title.toLowerCase()]}`;
  console.log(tasks);
  return (
    <div className={columnClass}>
      <h3>{title}</h3>
      {tasks?.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onView={onView}
          onEdit={onEdit}
          onChangeStatus={onChangeStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskColumn;
