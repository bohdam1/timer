import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTaskThunk } from "../../redux/Task/task.thunk"; // Імпортуємо thunk для додавання задачі
import styles from './NewTask.module.css'; // Імпортуємо стилі

const NewTask = ({ onClose }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeToSpend, setTimeToSpend] = useState(1);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Перетворення дати у потрібний формат
    const formattedEndTime = new Date(endTime).toISOString();

    const taskData = {
      taskName,
      description,
      endTime: formattedEndTime, // Використовуємо перетворену дату
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
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task Name"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
        <input
          type="number"
          value={timeToSpend}
          onChange={(e) => setTimeToSpend(Number(e.target.value))}
          required
        />
        <button type="submit">Create Task</button>
      </form>
    </>
  );
};

export default NewTask;
