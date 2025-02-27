
import { Suspense  } from "react"
import { Outlet , useLocation } from 'react-router-dom';
import css from "./Layout.modyle.css"
import {  useSelector } from "react-redux";
import { selectToken } from "../../redux/Auth/auth.selector";


import { HellowScrean } from "components/hellow screan/helow";

export const Layout = () => {
  const token = useSelector(selectToken);
 
  const location = useLocation();

  
  const isLayoutPage = location.pathname === '/';
  return (
    <>
        
      
      <main>
      {!token && isLayoutPage&& <HellowScrean/> }  
        <div className={css.container}>
          
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </>
  );
};