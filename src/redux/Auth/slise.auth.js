import { createSlice } from "@reduxjs/toolkit";
import { authInitState } from "./init-state.auth";
import { fetchRegistrThunk, deleteAccountThunk } from "./auth.thunk"; // Додаємо новий thunk
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "name", "timerStartTime", "timerSeconds"],
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistrThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.name = action.payload.user.name;
        state.isAuthenticated = true;
      })
      .addCase(fetchRegistrThunk.rejected, (state) => {
        state.isAuthenticated = false;
      })
      .addCase("auth/logout", (state) => { 
        state.token = null;
        state.isAuthenticated = false;
        state.timerStartTime = null;
        state.timerSeconds = null;
      })
      .addCase(deleteAccountThunk.fulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.name = null;
        state.timerStartTime = null;
        state.timerSeconds = null;
      });
  },
});

export const logout = () => ({ type: "auth/logout" });

export const authReducer = persistReducer(persistConfig, authSlice.reducer);
