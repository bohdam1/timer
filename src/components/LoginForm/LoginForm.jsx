import React, { useState } from "react";
import { useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { fetchRegistrThunk } from "../../redux/Auth/auth.thunk";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import css from "./LoginForm.module.css";
import { Link } from "react-router-dom"

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Викликаємо Thunk-функцію для входу
      const result = await dispatch(fetchRegistrThunk(formData)); // Не використовуємо .unwrap()
      console.log(result); // Логуємо результат для відлагодження
  
      // Перевірка на успішний результат (fulfilled)
      if (result.type === "auth/login/fulfilled" && result.payload.token) {
        toast.success("Вхід успішний!");
        navigate('/', { replace: true }); // Перенаправляємо лише у разі успіху
      } else {
        // Якщо результат відхилений або немає токену, виводимо помилку
        toast.error(result.payload?.message || "Помилка входу!");
      }
    } catch (error) {
      // Якщо сталася помилка в асинхронному виклику, відображаємо її
      
      toast.error(error.message || "Error occurred!");
    }
  };

  return (
    
      <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
        <h2 className={css.title}>Log in / Sign Up</h2>
        
        <label className={css.label}>
          <span className={css.span}>Email Address</span>
          <input
            className={css.input}
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            required
          />
        </label>
        
        <label className={css.label}>
          <span className={css.span}>Password</span>
          <input
            className={css.input}
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            required
          />
        </label>

        

        <button className={css.button} type="submit">Log in</button>

        <div className={css.footer}>
          Don't have an account? <Link className={css.link} to="/join"> Sign Up</Link>
        </div>
      </form>
    
  );
};
