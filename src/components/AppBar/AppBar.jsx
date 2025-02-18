import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectToken } from "../../redux/Auth/auth.selector";

import { useEffect } from "react";



import css from "./Appbar.module.css"
import ProfileMenu from "components/ProfaileMenu/ProfialeMenu";

export const AppBar = () => {
    const token = useSelector(selectToken);
    
    const dispatch = useDispatch();
  
    
  
    
    ;
  
    return (
      <header className={css.header}>
        
        <ProfileMenu/>

      </header>
    );
  };