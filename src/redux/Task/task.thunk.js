import { createAsyncThunk } from "@reduxjs/toolkit";
import {privateApi} from "../../components/API/API"; // Імпортуйте ваш API-клієнт


export const fetchTasksThunk = createAsyncThunk(
  "tasks/fetch",
  async (_, { rejectWithValue, getState }) => {
    try {
      // Отримуємо токен зі стейту
      const state = getState();
      const token = state.auth?.token; // Припустимо, токен зберігається в state.auth.token

      // Виконуємо запит до API
      const { data } = await privateApi.get("/task", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      return data; // Повертаємо отримані задачі
    } catch (error) {
      return rejectWithValue(error.response?.data || "Помилка під час завантаження задач");
    }
  }
);

// такскв по id 


export const addTaskThunk = createAsyncThunk(
  "task",
  async (taskData, { rejectWithValue, getState }) => {
    try {
      // Отримуємо токен зі стейту
      const state = getState();
      const token = state.auth?.token; // Припустимо, токен зберігається в state.auth.token

      const { data } = await privateApi.post(
        "/task",
        taskData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Додаємо токен в заголовок
          },
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Помилка під час додавання задачі");
    }
  }
);


export const updateTaskThunk = createAsyncThunk(
  'task/update',
  async ({ taskId, updates }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth?.token;

      const { data } = await privateApi.put(
        `task/${taskId}`,
        updates,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data); // Можно для дебага
      return data; // Возвращаем обновленные данные, чтобы они записались в стейт
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Помилка під час оновлення задачі');
    }
  }
);

export const deleteTaskThunk = createAsyncThunk(
  'task/delete',
  async (id, { rejectWithValue, getState }) => {
    try {
      // Отримуємо токен зі стейту
      const state = getState();
      const token = state.auth?.token; // Передбачається, що токен зберігається в state.auth.token

      await privateApi.delete(`/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Додаємо токен в заголовок
        },
        withCredentials: true,
      });

      return id; // Повертаємо ID видаленої задачі
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Помилка під час видалення задачі');
    }
  }
);


export const updateDoneThunk = createAsyncThunk(
  "contacts/updateFavorites",
  async (id, { rejectWithValue, getState }) => {
    try {
      
      const state = getState();
      const token = state.auth?.token; 

     
      const { data } = await privateApi.patch(
        `/task/${id}/done`, // Ваш маршрут
        null, // Якщо у вас немає тіла запиту, передаємо null
        {
          headers: {
            Authorization: `Bearer ${token}`, // Додаємо токен в заголовок
          },
          withCredentials: true,
        }
      );
      return data; // Повертаємо отримані дані (наприклад, оновлену задачу)
    } catch (error) {
      return rejectWithValue(error.response?.data || "Помилка при оновленні статусу");
    }
  }
);
