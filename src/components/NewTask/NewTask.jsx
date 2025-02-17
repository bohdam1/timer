import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTaskThunk } from "../../redux/Task/task.thunk"; 
import styles from './NewTask.module.css'; 

const NewTask = ({ onClose }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeToSpend, setTimeToSpend] = useState(1);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedEndTime = new Date(endTime).toISOString();

    const taskData = {
      taskName,
      description,
      endTime: formattedEndTime,
      timeToSpend,
    };
    console.log(taskData);

    try {
      await dispatch(addTaskThunk(taskData));
    } catch (error) {
      console.error("Помилка під час додавання задачі:", error);
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <form onSubmit={handleSubmit} className={styles['form-container']}>
        <button 
          type="button" 
          className={styles['close-button']} 
          onClick={(e) => { 
            e.stopPropagation(); 
            onClose(); 
          }}
        >
          ×
        </button>

        <div className={styles.inputContainer}>
          
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Назва завдання"
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputContainer}>
          
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Опис"
          required
          className={`${styles.input} ${styles.text_aria}`}
        />
        </div>

        <div className={styles.inputContainer}>
          
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputContainer}>
          
          <input
            type="number"
            value={timeToSpend}
            onChange={(e) => setTimeToSpend(Number(e.target.value))}
            required
            className={styles.input}
            placeholder="Час"
          />
        </div>

        <button type="submit" className={styles.submit_buttton}>Створити</button>
      </form>
    </>
  );
};

export default NewTask;
