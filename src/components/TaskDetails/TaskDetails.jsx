import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { privateApi } from "components/API/API";
import { useDispatch } from "react-redux";
import { updateTaskThunk } from "../../redux/Task/task.thunk";
import { ReactComponent as Arrow } from '../ICONS/arrow-before.svg';
import TaskTimer from "../timer/timer"
import css from "./TaskDetails.module.css";

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [, setElapsedSeconds] = useState(0);
  // Стан для редагування
  const [taskName, setTaskName] = useState("");
  const [createdAt, setcreatedAt] = useState("");
  const [description, setDescription] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeToSpend, setTimeToSpend] = useState("");
  const [isEditing, setIsEditing] = useState(false);


  const handleElapsedMinutesChange = (seconds) => {
    setElapsedSeconds(seconds);
  };
  // Завантаження задачі
  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const storedAuth = JSON.parse(localStorage.getItem("persist:auth"));
        const token = storedAuth?.token ? JSON.parse(storedAuth.token) : null;

        if (!token) {
          throw new Error("Token is missing");
        }

        const { data } = await privateApi.get(`/task/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setTask(data);

        
        setTaskName(data.taskName);
        setDescription(data.description);
        setEndTime(data.endTime ? new Date(data.endTime).toISOString().slice(0, -1) : "");
        setTimeToSpend(data.timeToSpend);
        setcreatedAt(data.createdAt);
      } catch (error) {
        setError(error.response?.data || "Помилка під час завантаження задачі");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  // Збереження змін в задачі
  const handleSaveChanges = async () => {
    try {
      const updatedTask = {
        taskName,
        description,
        endTime: endTime ? new Date(endTime).toISOString() : null,
        timeToSpend,
      };
  
      // Викликаємо thunk для оновлення задачі
      await dispatch(updateTaskThunk({ taskId, updates: updatedTask }));
  
      // Оновлюємо локальний стан з новими значеннями
      setTask((prevTask) => ({
        ...prevTask,
        taskName,
        description,
        endTime: endTime ? new Date(endTime).toISOString() : null,
        timeToSpend,
      }));
  
      setIsEditing(false); // Завершуємо редагування
    } catch (error) {
      setError("Помилка під час оновлення задачі");
    }
  };

  // Скасування змін
  const handleCancelChanges = () => {
    setTaskName(task.taskName);
    setDescription(task.description);
    setEndTime(task.endTime ? new Date(task.endTime).toISOString().slice(0, -1) : "");
    setTimeToSpend(task.timeToSpend);
    setIsEditing(false); // Вихід із режиму редагування
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!task) {
    return <div>No task found</div>;
  }

  return (
    <div className={css.taskDetails}>
      <div className={css.head}>
      <div className={css.button_con}>
        <button onClick={() => navigate(-1)} className={css.button_back}>
          <Arrow/>
        </button>
        <button onClick={() => navigate(-1)} className={css.backButton}>
          Назад
        </button>
      </div>
      {isEditing ? (
  <input
    type="text"
    value={taskName}
    onChange={(e) => setTaskName(e.target.value)}
    onBlur={() => setIsEditing(false)} // Виходимо з режиму редагування при втраті фокусу
    placeholder="Task Name"
    required
    className={css.editableText}
  />
) : (
  <h1 onClick={() => setIsEditing(true)} className={css.editableText}>
    {taskName}
  </h1>
)}
      </div>
      <div className={css.container}>
      <TaskTimer taskId={taskId} onElapsedMinutesChange={handleElapsedMinutesChange} deadlineHours={timeToSpend} createdAt={createdAt}/>
      {isEditing ? (
  <div>
   
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Description"
      required
      className={css.textarea}  
    />
    <div  className={css.ifo_dvn}>
      
    <div className={css.buttonGroup}>
      <button onClick={handleSaveChanges}className={css.editButton}>
        Застосувати
      </button>
      <button onClick={handleCancelChanges}className={css.editButton_left}>
        Скасувати
      </button>
    </div>
    <input
      type="datetime-local"
      value={endTime}
      onChange={(e) => setEndTime(e.target.value)}
      required
      className={`${css.ifo_con} ${css.input}`}

    />
    <input
      type="number"
      value={timeToSpend}
      onChange={(e) => setTimeToSpend(Number(e.target.value))}
      placeholder="Time to Spend (minutes)"
      required
      className={`${css.ifo_con} ${css.input}`}
    />
    </div>
  </div>
) : (
  <div>
    <p onClick={() => setIsEditing(true)} className={css.description}>
      {task.description}
    </p>
    <div className={css.ifo_dvn}>
      <button onClick={() => setIsEditing(true)} className={css.editButton}>
        Редагувати
      </button>
      <p className={css.ifo_con}>
        <strong>Дедлайн:</strong> {new Date(task.endTime).toLocaleDateString("uk-UA")}
      </p>
      <p className={css.ifo_con}>
        <strong>Час на виконання :</strong> {task.timeToSpend} годин
      </p>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default TaskDetails;
