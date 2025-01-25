import React, { useState } from 'react';
import { ReactComponent as UserIcon } from '../ICONS/reshot-icon-user-profile-EM8NS2L5GW.svg';
import { ReactComponent as Settings } from '../ICONS/icons8-settings.svg';
import { ReactComponent as Logout } from '../ICONS/logout-svgrepo-com.svg';
import { Link } from 'react-router-dom';
import css from "./ProfialeMenu.module.css";
import { logout } from "../../redux/Auth/slise.auth"; // Імпорт дії logout
import { useDispatch } from 'react-redux';

const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch(); // Ініціалізація useDispatch

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout()); // Виклик дії logout для очищення авторизаційного стану
    window.location.href = '/timer'; // Перенаправлення на сторінку '/timer'
  };

  return (
    <div 
      className={css.profileicon}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <UserIcon size={30} className={css.icons} />
      {isMenuOpen && (
        <div className={css.profilemenu}>
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
