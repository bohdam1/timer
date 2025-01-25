import { createSlice } from "@reduxjs/toolkit";
import { authInitState } from "./init-state.auth";
import { fetchRegistrThunk } from "./auth.thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "timerStartTime", "timerSeconds"],
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitState,
  reducers: {}, // Видаляємо стандартні ред'юсери
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistrThunk.pending, (state) => {
        // Можливо, ви хочете додати якісь зміни стану тут
      })
      .addCase(fetchRegistrThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
      })
      .addCase(fetchRegistrThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase("auth/logout", (state) => { // Переносимо логіку logout у екстра ред'юсери
        state.token = null;
        state.isAuthenticated = false;
        state.timerStartTime = null;
        state.timerSeconds = null;
      });
  },
});

// Додаємо action "logout" вручну, адже тепер це не у reducers
export const logout = () => ({ type: "auth/logout" });

// Обгортка для persistReducer
export const authReducer = persistReducer(persistConfig, authSlice.reducer);
