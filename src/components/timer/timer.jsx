import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import css from "./timer.module.css";
import { ReactComponent as Stop } from '../ICONS/photo/Group 92.svg';
import { ReactComponent as Start } from '../ICONS/photo/Group 94.svg';
import { ReactComponent as Reset } from '../ICONS/photo/Group 96.svg';

const TaskTimer = ({ taskId, deadlineHours, createdAt }) => {
  const deadlineSeconds = deadlineHours * 3600;
  const initialStartTime = new Date(createdAt).getTime();

  const [startTime, setStartTime] = useState(initialStartTime);
  const [elapsedSeconds, setElapsedSeconds] = useState(() => {
    return Math.floor((Date.now() - initialStartTime) / 1000);
  });

  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const updateTimer = () => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    };

    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [startTime, isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    setStartTime(Date.now() - elapsedSeconds * 1000);
  };

  const handleStop = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setElapsedSeconds(0);
    setStartTime(Date.now());
  };

  const remainingSeconds = Math.max(deadlineSeconds - elapsedSeconds, 0);
  const progress = (elapsedSeconds / deadlineSeconds) * 100;

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={css.container}>
      <div className={css.progress_wrapper}>
        <CircularProgressbar
          value={progress}
          text={formatTime(remainingSeconds)}
          styles={buildStyles({
            textSize: '64px', // Задаємо розмір шрифту
            textColor: 'transparent', // Робимо текст прозорим
            pathColor: '#FF6884',
            trailColor: '#ddd',
            strokeLinecap: 'round',
          })}
        />
        <div className={css.timerText}>{formatTime(remainingSeconds)}</div>
      </div>
      <div className={css.controls}>
        <button onClick={handleStart} disabled={isRunning}>
          <Start/>
        </button>
        <button onClick={handleStop} disabled={!isRunning}>
          <Stop/>
          </button>
        <button onClick={handleReset}>
          <Reset/>
        </button>
      </div>
    </div>
  );
};

export default TaskTimer;
