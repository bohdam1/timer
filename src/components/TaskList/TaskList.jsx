import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { TaskItem } from "components/TaskItem/TaskItem";
import { fetchTasksThunk } from "../../redux/Task/task.thunk"; // імпортуйте ваш thunk для завантаження задач
import css from "./TaskList.module.css";

export const TaskList = ({ filter }) => {
  const dispatch = useDispatch();

  // Отримуємо всі задачі зі стейту
  const tasks = useSelector((state) => state.tasks.tasks);

  // Викликаємо fetchTasksThunk після завантаження компонента
  useEffect(() => {
    dispatch(fetchTasksThunk());
  }, [dispatch]);

  // Фільтруємо задачі в залежності від вибору
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.done; // Показуємо тільки виконані задачі
    }
    return true; // Показуємо всі задачі
  });

  return (
    <ul className={css.list}>
      {filteredTasks.map((task) => (
        <TaskItem
          key={task._id}
          taskId={task._id}
          taskName={task.taskName}
          description={task.description}
          endTime={task.endTime}
          timeToSpend={task.timeToSpend}
          owner={task.owner}
        />
      ))}
    </ul>
  );
};
