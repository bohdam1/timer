import React, { useState } from 'react';
import { ReactComponent as Settings } from '../ICONS/icons8-settings.svg';
import { ReactComponent as Logout } from '../ICONS/logout-svgrepo-com.svg';
import { Link } from 'react-router-dom';
import css from "./ProfialeMenu.module.css";
import { logout } from "../../redux/Auth/slise.auth";
import { useDispatch } from 'react-redux';
import { ReactComponent as MenuIcon } from "../ICONS/MEEE.svg";

const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isIconFaded, setIsIconFaded] = useState(false); // Для ефекту прозорості
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsIconFaded(prevState => !prevState); // Перемикаємо прозорість іконки
  };

  return (
    <div className={css.profileicon}>
      {/* Іконка меню з ефектом прозорості */}
      <div 
        onClick={handleMenuToggle}
        className={css.menu_icon}
        style={{
          opacity: isIconFaded ? 0.6 : 1, // Змінюємо прозорість
          transition: 'opacity 0.3s ease'
        }}
      >
        <MenuIcon />
      </div>

      {/* Меню */}
      {isMenuOpen && (
        <div 
          className={css.profilemenu} 
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <Link to="/settings" className={css.profilemenuButton}>
            <Settings className={css.profaileIcons} />
            Налаштування
          </Link>
          <button onClick={handleLogout} className={css.profilemenuButton}>
            <Logout className={css.profaileIcons} />
            Вийти
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
