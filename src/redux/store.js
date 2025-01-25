import { configureStore } from "@reduxjs/toolkit";

import {authReducer} from "./Auth/slise.auth"
import tasksReducer from './Task/task.slice';
import { persistStore,  FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER, } from 'redux-persist'





export const store = configureStore({
  reducer:{
    
 
    auth : authReducer,
    tasks: tasksReducer,
   
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore (store)
