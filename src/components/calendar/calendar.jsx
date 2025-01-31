import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import css from './calendar.module.css'; // Імпортуємо CSS модуль

const TaskCalendar = () => {
  const tasks = useSelector((state) => state.tasks.tasks); // Отримуємо завдання з Redux стейту
  const [value, setValue] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false); // Стан для керування видимістю списку задач
  const [selectedDate, setSelectedDate] = useState(null); // Стан для збереження вибраної дати

  const taskDates = tasks.map(task => new Date(task.endTime).toDateString());

  // Функція для запиту дозволу на показ сповіщень
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission !== 'granted') {
          console.warn('Сповіщення вимкнені користувачем');
        }
      });
    }
  }, []);

  // Створення браузерного сповіщення
  const showNotification = (task) => {
    if (Notification.permission === 'granted') {
      new Notification(`Наближається дедлайн!`, {
        body: `Завдання: ${task.taskName}\nДедлайн: ${new Date(task.endTime).toLocaleString()}`,
        icon: '/path/to/icon.png', // Ви можете додати власну іконку
      });
    }
  };

  // Перевірка дедлайнів і показ сповіщень
  useEffect(() => {
    const checkDeadlines = () => {
      const now = new Date();
      tasks.forEach(task => {
        const taskDeadline = new Date(task.endTime);
        const timeDifference = taskDeadline - now; // Різниця в мілісекундах
        const oneDayInMs = 24 * 60 * 60 * 1000;

        if (timeDifference > 0 && timeDifference <= oneDayInMs) {
          showNotification(task); // Виклик функції для показу сповіщення
        }
      });
    };

    const intervalId = setInterval(checkDeadlines, 60 * 1000); // Перевіряємо кожну хвилину

    return () => clearInterval(intervalId); // Очищуємо інтервал при демонтуванні
  }, [tasks]);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toDateString();
      if (taskDates.includes(dateStr)) {
        return `${css.highlightTask} ${css.reactCalendar__tile__hasTask}`; // Додаємо клас для підсвічування днів з тасками
      }
      if (dateStr === new Date().toDateString()) {
        return css.reactCalendar__tileNow; // Поточний день з сірим кольором
      }
    }
  };

  const formatMonthYear = (locale, date) => {
    const monthYearString = date.toLocaleString(locale, { month: 'long', year: 'numeric' });
    return (
      <div className={css.customMonthYear}>
        <span>{monthYearString}</span>
      </div>
    );
  };

  const handleDateClick = (date) => {
    setSelectedDate(date.toDateString());
    setValue(date); // Update value to selected date
    setIsOpen(!isOpen); // Toggle visibility of task list on date click
  };

  const toggleTaskList = () => setIsOpen(!isOpen); // Тогл для списку завдань

  const filteredTasks = tasks.filter(task => new Date(task.endTime).toDateString() === selectedDate);

  return (
    <div>
      <Calendar
        onChange={setValue}
        value={value}
        tileClassName={tileClassName}
        className={css.reactcalendar}
        formatMonthYear={formatMonthYear} // Формат місяця і року
        next2Label={null} // Приховуємо стрілочки для зміни року
        prev2Label={null} // Приховуємо стрілочки для зміни року
        onClickDay={handleDateClick} // Додаємо обробник для кліку на день
      />
      
      {isOpen && (
        <>
        <p className={css.task_you}>Твої задачі</p>
        <ul className={css.taskList}>
          {filteredTasks.map(task => (
           <li key={task._id} className={`${css.taskItem} ${task.done ? 'completed' : ''}`}>
             {task.done && <div className={css.taskCompletedIcon}></div>}
             <div>
               <h3 className={task.done ? css.doneTask : ''}>{task.taskName}</h3>
             </div>
           </li>
          ))}
        </ul>
        
        
        </>
      )}
    </div>
  );
};

export default TaskCalendar;
