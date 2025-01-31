import { useState } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/Auth/auth.selector";
import { TaskList } from "components/TaskList/TaskList"; // Загальний список завдань
import NewTask from "components/NewTask/NewTask"; // Імпорт компонента TaskForm
import TaskCalendar from "components/calendar/calendar";
import css from "./home-page.module.css"

export const HomeScreen = () => {
  const token = useSelector(selectToken);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [filter, setFilter] = useState("all"); // Стан для фільтру

  const handleCreateTaskClick = () => {
    setShowTaskForm(!showTaskForm);
  };

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType); // Оновлюємо стан фільтра
  };

  return (
    <div className={css.home_page}>
      {token && (
        <>
      
        <div className={css.calendar_container}>
          <button onClick={handleCreateTaskClick} className={css.new_task_button}>+ Додати завдання</button>
          {showTaskForm && <NewTask onClose={handleCloseTaskForm} />}
          <TaskCalendar/>
        </div>
          
          <div className={css.task_list}>
            <div className={css.filter_buttons}>
              <button onClick={() => handleFilterChange("all")} className={css.filter_button}>Усі</button>
              <button onClick={() => handleFilterChange("completed")} className={css.filter_button}>Виконані</button>
            </div>
            {/* <TaskList filter={filter} /> */}

          </div>
        </>
      )}
    </div>
  );
};
