
import { JoinForm } from "../components/JoinForm/JoinForm"
import css from "./join-page.module.css"
import { ReactComponent as User } from '../components/ICONS/ble user-filled.svg';
import { ReactComponent as Logo } from '../components/ICONS/logo planner.svg';
import photo from '../components/ICONS/Group 46.png'

export const JoinPage = ()=> {

    
    return (
        
            <div className={css.join_page}>
                <div className={css.left_side}>

                    <div className={css.logo_con}>
                            <Logo className={css.logo}/>
                            <div className={css.userSection}>
                                <User className={css.username} />
                                <p className={css.userGreeting}>Твій планувальник</p>
                            </div>
                        
                    </div>
                    <div className={css.img_con}>

                    <img src={photo} className={css.photo}alt="phoyo"/>
                    </div>
                </div>
                <JoinForm/>

            </div>
          
            
          

        
        
       
       
    )
}