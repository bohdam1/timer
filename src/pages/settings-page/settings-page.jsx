import React, { useState } from "react";
import { useSelector } from "react-redux"; // For Redux state access
import axios from "axios"; // For making API requests
import css from "./SettingsPage.module.css"; // For styling
import { privateApi } from "components/API/API"; // Custom API instance

const SettingsPage = () => {
  // Define state for password change form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // Define state for avatar upload
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  // For token (can be from Redux, context, or props)
  const token = useSelector((state) => state.auth.token); // Assuming you are using Redux for auth token
  const task = useSelector((state) => state.tasks.tasks);
  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Ensure task is defined, otherwise handle appropriately
    const requestData = {
      userId: task[1]?.owner, // Get owner from task, adjust if needed
      currentPassword,
      newPassword,
    };

    try {
      const { data } = await privateApi.patch(
        "/auth/password",
        requestData, 
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correct Bearer token format
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Password changed:", data);
      alert("Пароль успішно змінено!");

      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Error changing password:", error.response?.data || error);
      alert(error.response?.data?.message || "Не вдалося змінити пароль. Спробуйте ще раз.");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadAvatar = async () => {
    if (!avatar) {
      alert("Оберіть зображення перед завантаженням.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      const response = await axios.post("/auth/avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Correct Bearer token format
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Avatar uploaded:", response.data);
      alert("Аватар успішно завантажено!");
      setAvatar(null);
      setPreview(null);
    } catch (error) {
      console.error("Error uploading avatar:", error.response?.data || error);
      alert(error.response?.data?.message || "Не вдалося завантажити аватар. Спробуйте ще раз.");
    }
  };

  return (
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

      <hr className={css.divider} />

      {/* Avatar Upload Section */}
      <div className={css.avatarSection}>
        <h3 className={css.sectionTitle}>Оновити аватар</h3>
        {preview && (
          <div className={css.avatarPreviewContainer}>
            <img
              src={preview}
              alt="Попередній перегляд"
              className={css.avatarPreview}
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className={css.fileInput}
        />
        <button
          style={{ marginTop: "10px" }}
          onClick={handleUploadAvatar}
          className={css.uploadButton}
        >
          Завантажити аватар
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
