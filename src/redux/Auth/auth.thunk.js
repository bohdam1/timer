import { createAsyncThunk } from "@reduxjs/toolkit";
import {  privateApi } from "../../components/API/API";



export const fetchRegistrThunk = createAsyncThunk('auth/login', async (formData, { rejectWithValue }) => {
  try {
    const { data } = await privateApi.post('/auth/login', formData, {
      withCredentials: true,
    });
    
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Помилка під час виконання запиту');
  }
});

export const deleteAccountThunk = createAsyncThunk(
  "auth/deleteAccount",
  async (userId, { rejectWithValue, getState }) => { // Додаємо getState
    try {
      const state = getState();
      const token = state.auth?.token;

      if (!token) {
        throw new Error("Токен не знайдено");
      }
  
      
      const response = await privateApi.delete("/auth/account", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: { userId }, // Передаємо userId в body
      });

      localStorage.clear(); // Очищаємо localStorage після видалення акаунту

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Помилка видалення акаунту");
    }
  }
);
