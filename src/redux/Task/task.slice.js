import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./init-state.task"; // Імпортуємо початковий стан
import {
  addTaskThunk,
  deleteTaskThunk,
  updateTaskThunk,
  fetchTasksThunk,
  updateDoneThunk,
  
} from "./task.thunk";
import storage from "redux-persist/lib/storage"; // Для збереження у localStorage
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "tasks", // Ключ для збереження задач у localStorage
  storage,
  whitelist: ["tasks"], // Зберігаємо лише список задач
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasksThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload; // Оновлюємо список задач
      })
      .addCase(fetchTasksThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Зберігаємо помилку
      })




      // Add task
      .addCase(addTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



       

      // Delete task
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.error = action.payload || "Помилка при видаленні задачі";
      })


     
      .addCase(updateTaskThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const updatedTask = action.payload;
        const index = state.tasks.findIndex((task) => task._id === updatedTask._id); // Використовуємо _id замість id
      
        if (index !== -1) {
          // Оновлюємо задачу
          state.tasks[index] = updatedTask; // Замість старої задачі вставляємо оновлену
        }
      })
      .addCase(updateTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Помилка під час оновлення задачі";
      })
      


      // Update task done status
      .addCase(updateDoneThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoneThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTask = action.payload;
        const index = state.tasks.findIndex((task) => task._id === updatedTask._id); 
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
       
      })
      .addCase(updateDoneThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
  },
});

// Обгортка для persistReducer
export const tasksReducer = persistReducer(persistConfig, tasksSlice.reducer);

export default tasksReducer;
