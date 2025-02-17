import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../redux/Auth/auth.selector";
import { TaskList } from "components/TaskList/TaskList";
import NewTask from "components/NewTask/NewTask";
import TaskCalendar from "components/calendar/calendar";
import css from "./home-page.module.css";
import { ReactComponent as LoopIcon } from "../components/ICONS/tabler_zoom.svg";

import img from "../components/ICONS/notebook_blje.png"
import ProfileMenu from "../components/ProfaileMenu/ProfialeMenu"

export const HomeScreen = () => {
  const token = useSelector(selectToken);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Отримуємо дані з localStorage
    const authData = localStorage.getItem("persist:auth");

    if (authData) {
        try {
            const parsedAuth = JSON.parse(authData);
            const cleanName = parsedAuth.name.replace(/^"|"$/g, ""); // Прибираємо лапки
            setUserName(cleanName || "Гість");
        } catch (error) {
            console.error("Помилка при парсингу localStorage:", error);
        }
    }
}, []);
  const toggleTaskForm = () => setShowTaskForm((prev) => !prev);
  const closeTaskForm = () => setShowTaskForm(false);
  const toggleFilter = () => setFilter((prev) => (prev === "all" ? "completed" : "all"));
 
  return (
    <div className={css.home_page}>
      {token && (
        <>
          <div className={css.calendar_container}>
            <button onClick={toggleTaskForm} className={css.new_task_button}>
              + Додати завдання
            </button>
            {showTaskForm && <NewTask onClose={closeTaskForm} />}
            <TaskCalendar />
          </div>

          <div className={css.task_list}>
            <div className={css.head}>
              <p className={css.note}>Нотатки</p>
              <div className={css.search_container}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={css.search_input}
                  placeholder="Пошук..."
                />
                <LoopIcon className={css.loop} />
              </div>

              <div className={css.filter_container}>
              <span className={css.complite}>
                  {filter === "completed" ? "Виконані" : "Усі"} {/* Умовне відображення тексту */}
                </span>
                <input 
                  type="checkbox" 
                  id="toggle" 
                  checked={filter === "completed"} 
                  onChange={toggleFilter} 
                  className={css.toggle} 
                />
                <label htmlFor="toggle" className={css.switch}></label>
              </div>
              
              <ProfileMenu/>
            </div>
            <div className={css.hellow_container}>
                <div className={css.name_comtainer}>
                <h2 className={css.title_name}>З поверненям,  {userName}!</h2>
                <p className={css.text_name}> Тут зібрані усі ваші завдання. Завершуйте їх швидше і 
                    не забувайте додавати <br/>нові! Це допоможе примати все під контролем і не 
                    пропустити важливі справи.
                </p>

                </div>
                <img className={css.helow_img} src={img} alt=""/>

            </div>

            <TaskList filter={filter} searchTerm={searchTerm} />
          </div>
        </>
      )}
    </div>
  );
};
