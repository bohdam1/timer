import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { privateApi } from "components/API/API";
import { useDispatch } from "react-redux";
import { updateTaskThunk } from "../../redux/Task/task.thunk"; // Імпортуємо thunk для оновлення задачі
import css from "./TaskDetails.module.css";

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Стан для редагування
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeToSpend, setTimeToSpend] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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

        // Оновлюємо значення для редагування
        setTaskName(data.taskName);
        setDescription(data.description);
        setEndTime(data.endTime ? new Date(data.endTime).toISOString().slice(0, -1) : "");
        setTimeToSpend(data.timeToSpend);
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
      <button onClick={() => navigate(-1)} className={css.backButton}>
        Назад
      </button>

      {isEditing ? (
        <div>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task Name"
            required
            className={css.input}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className={css.textarea}
          />
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className={css.input}
          />
          <input
            type="number"
            value={timeToSpend}
            onChange={(e) => setTimeToSpend(Number(e.target.value))}
            placeholder="Time to Spend (minutes)"
            required
            className={css.input}
          />
          <div className={css.buttonGroup}>
            <button onClick={handleSaveChanges} className={css.saveButton}>
              Застосувати
            </button>
            <button onClick={handleCancelChanges} className={css.cancelButton}>
              Скасувати
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1 onClick={() => setIsEditing(true)} className={css.editableText}>
            {task.taskName}
          </h1>
          <p onClick={() => setIsEditing(true)} className={css.editableText}>
            {task.description}
          </p>
          <p>
            <strong>End Time:</strong> {task.endTime ? new Date(task.endTime).toLocaleString() : "N/A"}
          </p>
          <p>
            <strong>Time to Spend:</strong> {task.timeToSpend} minutes
          </p>
          <button onClick={() => setIsEditing(true)} className={css.editButton}>
            Редагувати
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
