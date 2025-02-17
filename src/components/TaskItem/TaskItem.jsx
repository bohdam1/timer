import React from 'react';
import css from "./TaskItem.module.css";
import { useDispatch } from 'react-redux';
import { deleteTaskThunk, updateDoneThunk } from "../../redux/Task/task.thunk";
import { Link } from "react-router-dom";
import { ReactComponent as Pen } from '../ICONS/pen.svg';
import { ReactComponent as Tresh } from '../ICONS/trash.svg';
import { ReactComponent as Galka } from '../ICONS/galka.svg';
import { ReactComponent as PenPink } from '../ICONS/pen_pink.svg';
import { ReactComponent as TreshPink } from '../ICONS/trash-pink.svg';
export const TaskItem = ({ taskId, taskName, description, done }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm('Ви дійсно хочете видалити цю задачу?')) {
      dispatch(deleteTaskThunk(taskId));
    }
  };

  const handleDone = () => {
    dispatch(updateDoneThunk(taskId));
  };

  return (
    <div className={`${css.taskItem} ${done ? css.completed_taskItem : ""}`}>
      <div className={css.top_container}>
        <div className={css.name_container}>
          <p className={css.name}>{taskName}</p> 
          <Link to={`/detail/${taskId}`}>

          {!done? <Pen/> : <PenPink className={css.pen_pink}/>}
            
          </Link> 
        </div>
      </div>

      <div className={css.top_container}>
        <div className={css.description_container}>
          <p className={css.description}>{description}</p>
        </div>
      </div>

      <div className={css.button_container}>
        {!done ? (
          <button className={css.button_done} onClick={handleDone}>
            <Galka  />
          </button>
        ) : (
          <span className={css.completed_text}>Виконано</span>
        )}
        <button className={css.button_delete} onClick={handleDelete}>
        {!done ? (
          <Tresh />
        ) : (
         <TreshPink/>
        )}
          
        </button>
      </div>
    </div>
  );
};
