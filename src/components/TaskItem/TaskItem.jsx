import React, { useState } from 'react';
import TaskTimer from "components/timer/timer";
import css from "./TaskItem.module.css";
import { ProgressBar } from "components/Progres/Progres";
import { useDispatch } from 'react-redux';
import { deleteTaskThunk, updateDoneThunk } from "../../redux/Task/task.thunk";
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from "react-router-dom";

export const TaskItem = ({ taskId, taskName, description, timeToSpend }) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleElapsedMinutesChange = (seconds) => {
    setElapsedSeconds(seconds);
  };

  const handleDelete = () => {
    if (window.confirm('Ви дійсно хочете видалити цю задачу?')) {
      dispatch(deleteTaskThunk(taskId)); // Викликаємо Thunk
    }
  };

  const handleDone = () => {
    dispatch(updateDoneThunk(taskId));
  };

  const progressPercentage = timeToSpend
    ? Math.round(Math.min((elapsedSeconds / 60 / timeToSpend) * 100, 100))
    : 0;

  return (
    <li className={css.taskItem}>
      <div className={css.top_container}>
        
        <div className={css.name_container} >
          <Link to={`/detail/${taskId}`}>
          <p className={css.name}>{taskName}</p> {/* Використовуємо проп taskName */}
          <ProgressBar percentage={progressPercentage} />
          
          </Link> 
        </div>
        <TaskTimer taskId={taskId} onElapsedMinutesChange={handleElapsedMinutesChange} />
      </div>
      <div className={css.top_container}>
        <Link to={`/detail/${taskId}`}>
        <div className={css.description_container} >
        
          <p className={css.description}>{description}</p> {/* Використовуємо проп description */}
        </div>
        </Link>
      </div>
      <div className={css.button_container}>
        <button className={css.button_done} onClick={ handleDone}>done</button>
        <button className={css.button_delete} onClick={ handleDelete}>delete</button>
      </div>
    </li>
  );
};
