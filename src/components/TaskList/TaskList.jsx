import { useSelector, useDispatch } from "react-redux";
import { Component, useEffect, useRef } from "react"; // Додаємо useRef
import Slider from "react-slick"; // Імпортуємо карусель
import { TaskItem } from "components/TaskItem/TaskItem";
import { fetchTasksThunk } from "../../redux/Task/task.thunk"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import css from "./TaskList.module.css";
export const TaskList = ({ filter, searchTerm }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const sliderRef = useRef(null); // Створюємо ref для керування слайдером

  useEffect(() => {
    dispatch(fetchTasksThunk());
  }, [dispatch]);

  const filteredTasks = tasks
    .filter((task) => (filter === "completed" ? task.done : true))
    .filter((task) => task.taskName.toLowerCase().includes(searchTerm.toLowerCase()));

  // Налаштування каруселі
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false, // Вимикаємо стандартні стрілки
  };

  return (
    <div className={css.carouselContainer}>
      <div className={css.button_container}>
        <p className={css.slider_title}> Твої завдання</p>
      <div className={css.controls}>
        <button onClick={() => sliderRef.current.slickPrev()} className={css.controlButton}>
          ❮ 
        </button>
        <button onClick={() => sliderRef.current.slickNext()} className={css.controlButton}>
          ❯
        </button>
      </div>
      </div>

      {/* Слайдер */}
      <Slider ref={sliderRef} {...settings} className={css.slider}>
        {filteredTasks.map((task) => (
          
            <TaskItem
              key={task._id}
              taskId={task._id}
              taskName={task.taskName}
              description={task.description}
              endTime={task.endTime}
              timeToSpend={task.timeToSpend}
              owner={task.owner}
              done={task.done}
            />
         
        ))}
      </Slider>
    </div>
  );
};
