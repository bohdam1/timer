import css from "./JoinForm.module.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom"; // Додано Link
import { PublickApi } from "../API/API";

const initialState = {
  name: "",
  password: "",
  email: "",
};

export const JoinForm = () => {
  const [formData, setFormData] = useState(initialState);
  
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Виконуємо запит до API для реєстрації
      const response = await PublickApi.post("/auth/register", formData);
      console.log("Реєстрація успішна", response); // Лог для перевірки відповіді
  
      // Виводимо повідомлення про успішну реєстрацію
      toast.success("Реєстрація пройшла успішно! Ви можете увійти.");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000); // Час в мілісекундах (3 секунди)
  
      // Скидаємо форму після успішної реєстрації
      setFormData(initialState);
    } catch (err) {
      // Обробляємо помилки
      console.error("Помилка реєстрації:", err);
  
      // Виводимо повідомлення про помилку
      toast.error(err.response?.data?.message || "Виникла помилка під час реєстрації.");
    }
  };


  return (
    <>
      <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
        <h2 className={css.title}>Ласкаво просимо до реєстрації !</h2>
        <label className={css.label}>
          <span className={css.span}>Ім‘я</span>
          <input
            className={css.input}
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </label>
        <label className={css.label}>
          <span className={css.span}>Пароль</span>
          <input
            className={css.input}
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
        </label>
        <label className={css.label}>
          <span className={css.span}>Електронна пошта</span>
          <input
            className={css.input}
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
        </label>

        <button className={css.button} type="submit">
        Зареєструватись
        </button>

        {/* Додано посилання для переходу на сторінку входу */}
        <p className={css.footerText}>
          Вже зареєстровані?{" "}
          <Link to="/login" className={css.link}>
            Увійти
          </Link>
        </p>
      </form>
      <ToastContainer />
    </>
  );
};
