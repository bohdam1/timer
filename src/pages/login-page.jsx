import { LoginForm } from "../components/LoginForm/LoginForm";
import css from "./logim-page.module.css"; // Import CSS module
import { ReactComponent as Logo } from '../components/ICONS/logo planner.svg';
import { ReactComponent as User } from '../components/ICONS/tabler_user-filled.svg';
import { ReactComponent as Arrow } from '../components/ICONS/Arrow 5.svg';
import phone  from "../components/ICONS/Frame 41.png" ; 
import phtwo  from "../components/ICONS/Frame 39.png" ; 
import phtyhre from "../components/ICONS/Frame 42.png" ; 
import comas from "../components/ICONS/comapng.png"
import fore from "../components/ICONS/undraw_working_n9u0 2.png"


export const LoginPage = () => {
    return (
        <div className={css.loginPage}>
            <div className={css.formSide}>
                <Logo className={css.logo}/>
                <h2 className={css.title}>Увійдіть у свій<br/> обліковий запис !</h2>
                <LoginForm />
            </div>
            <div className={css.textSide}>
                <div className={css.userSection}>
                    <User className={css.userName} />
                    <p className={css.userGreeting}>Твій планувальник</p>
                </div>
                
                <h2 className={css.title_text}>Плануйте без зайвого клопоту</h2>
                <div className={css.photo_list}>
                    <img className={css.photo} src={phtyhre} alt="image"/>
                    <img className={css.photo} src={phone} alt="image"/>
                    <img className={css.photo} src={phtwo} alt="image"/>
                    <img className={css.photo} src={fore} alt="image"/>
                </div>
                <div className={css.descriptionSection}>
                    <p className={css.descriptionText}>
                        Організуйте свої думки, справи та мрії. Плануйте легко, досягайте більше.
                    </p>
                    <div className={css.comas_list}>
                        <img className={css.coma} src={comas}/>
                        <img className={css.comas} src={comas}/>
                    </div>
                </div>
                <Arrow className={css.arrow}/>
            </div>
        </div>
    );
};
