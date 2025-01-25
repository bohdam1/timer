import { createAsyncThunk } from "@reduxjs/toolkit";
import { PublickApi,  privateApi } from "../../components/API/API";
import { selectToken } from "./auth.selector";


export const fetchRegistrThunk = createAsyncThunk('auth/login', async (formData, { rejectWithValue }) => {
  try {
    const { data } = await privateApi.post('/auth/login', formData, {
      withCredentials: true,
    });
    console.log(data.token);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Помилка під час виконання запиту');
  }
});

