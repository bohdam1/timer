import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Додано useDispatch
import { deleteAccountThunk } from "../../redux/Auth/auth.thunk";

import css from "./SettingsPage.module.css";
import { privateApi } from "components/API/API";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Arrow } from "../../components/ICONS/arrow-before.svg";

const SettingsPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const task = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch(); // Додано useDispatch()

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const requestData = {
      userId: task[0]?.owner,
      currentPassword,
      newPassword,
    };

    try {
      const { data } = await privateApi.patch("/auth/password", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("Пароль успішно змінено!");
      setCurrentPassword("");
      setNewPassword("");
      console.log(data);
    } catch (error) {
      alert(error.response?.data?.message || "Не вдалося змінити пароль.");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Ви дійсно хочете видалити свій акаунт? Це необоротно.")) {
      const userId = task[0]?.owner;

      if (!userId) {
        alert("Не вдалося отримати ID користувача.");
        return;
      }

      try {
        await dispatch(deleteAccountThunk(userId)).unwrap();
        alert("Акаунт успішно видалено.");
        navigate("/login");
      } catch (error) {
        alert(error || "Не вдалося видалити акаунт.");
      }
    }
  };

  return (
    <div className={css.seating_page}>
      <div className={css.button_con}>
        <button onClick={() => navigate(-1)} className={css.button_back}>
          <Arrow />
        </button>
        <button onClick={() => navigate(-1)} className={css.backButton}>
          Назад
        </button>
      </div>

      <div className={css.settingsContainer}>
        <h2 className={css.settingsTitle}>Налаштування</h2>

        {/* Password Change Form */}
        <form onSubmit={handleChangePassword} className={css.passwordForm}>
          <h3 className={css.sectionTitle}>Змінити пароль</h3>
          <div className={css.formGroup}>
            <label className={css.formLabel}>
              Поточний пароль:
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className={css.formInput}
              />
            </label>
          </div>
          <div className={css.formGroup}>
            <label className={css.formLabel}>
              Новий пароль:
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className={css.formInput}
              />
            </label>
          </div>
          <button type="submit" className={css.submitButton}>
            Змінити пароль
          </button>
        </form>

        {/* Delete Account Button */}
        <button onClick={handleDeleteAccount} className={css.deleteAccountButton}>
          Видалити акаунт
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
