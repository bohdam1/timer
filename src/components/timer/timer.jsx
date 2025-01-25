import React, { useState, useEffect } from 'react';
import css from "./timer.module.css";

const TaskTimer = ({ taskId, onElapsedMinutesChange }) => {
  const [seconds, setSeconds] = useState(() => {
    const savedSeconds = localStorage.getItem(`timerSeconds-${taskId}`);
    return savedSeconds ? parseInt(savedSeconds, 10) : 0;
  });
  const [isRunning, setIsRunning] = useState(() => {
    const savedRunningStatus = localStorage.getItem(`timerRunningStatus-${taskId}`);
    return savedRunningStatus === 'true'; // Якщо в localStorage збережений статус таймера "running", то ставимо true
  });

  const [startTime, setStartTime] = useState(() => {
    const savedStartTime = localStorage.getItem(`timerStartTime-${taskId}`);
    return savedStartTime ? parseInt(savedStartTime, 10) : Date.now();
  });

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setSeconds(elapsed);
        localStorage.setItem(`timerSeconds-${taskId}`, elapsed.toString());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, startTime, taskId]);

  useEffect(() => {
    localStorage.setItem(`timerRunningStatus-${taskId}`, isRunning.toString());
  }, [isRunning, taskId]);

  useEffect(() => {
    onElapsedMinutesChange(seconds);
  }, [seconds, onElapsedMinutesChange]);

  // Старт таймера
  const startTimer = () => {
    const currentStartTime = Date.now() - seconds * 1000;
    localStorage.setItem(`timerStartTime-${taskId}`, currentStartTime.toString());
    setStartTime(currentStartTime);
    setIsRunning(true);
  };

  // Зупинка таймера
  const stopTimer = () => {
    setIsRunning(false);
    localStorage.removeItem(`timerStartTime-${taskId}`);
  };

  // Скидання таймера
  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
    localStorage.removeItem(`timerStartTime-${taskId}`);
    localStorage.removeItem(`timerSeconds-${taskId}`);
    localStorage.removeItem(`timerRunningStatus-${taskId}`);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={css.container}>
      <h2 className={css.timer}>{formatTime(seconds)}</h2>
      <div className={css.button_con}>
        {isRunning ? (
          <button className={css.button_stop} onClick={stopTimer}>Stop</button>
        ) : (
          <button className={css.button_start} onClick={startTimer}>Start</button>
        )}
        <button className={css.button_reset} onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default TaskTimer;
