import { Route, Routes } from 'react-router-dom';
import { Layout } from "./Layout/Layout";
import { PublickeRoute } from "./AuthRauth/Publick.rauth";
import { JoinPage } from "pages/join-paige";
import { LoginPage } from "pages/login-page";
import { PrivateRoute } from "./AuthRauth/Private.rauth";
import { HomeScreen } from 'pages/home-page';
import TaskDetails from "../components/TaskDetails/TaskDetails";
import SettingsPage from "../pages/settings-page/settings-page";
import { ToastContainer } from 'react-toastify';

export const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeScreen />} /> {/* Головна сторінка */}

          {/* Публічні маршрути */}
          <Route element={<PublickeRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/join" element={<JoinPage />} />
          </Route>

          {/* Приватні маршрути */}
          <Route element={<PrivateRoute />}>
            <Route path='/settings' element={<SettingsPage />} />
            <Route path="/detail/:taskId" element={<TaskDetails />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
