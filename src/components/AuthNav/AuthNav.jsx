import { Link } from "react-router-dom"
import css from "./AuthNav.module.css"
import { ReactComponent as Logo } from '../ICONS/logo planner.svg';
export const AuthNav = ()=>{

    return (
        <header className={css.header}>
            <div >
               <Logo/>
    
            </div>
            <nav className={css.nav}>
                <ul className={css.navlist}>
                    <li className={css.navitem_login}><Link className={css.link_login} to="/login">Авторизуватись</Link></li>
                    <li className={css.navitem_registr}><Link  className={css.link_registr} to="/join">Зареєструватись</Link></li>
                </ul>
            </nav>
        

        </header>
    )
}