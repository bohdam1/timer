import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import 'normalize.css';
import './index.css';
import { Provider } from 'react-redux';
import {store} from "./redux/store"
import { PersistGate } from 'redux-persist/integration/react';
import {persistor} from "./redux/store"
import {BrowserRouter} from "react-router-dom"
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter basename="timer">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
</React.StrictMode>
);
