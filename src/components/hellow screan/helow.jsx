import React from 'react';
import css from"./hellow.module.css"
import { AuthNav } from 'components/AuthNav/AuthNav';
import img from "../ICONS/photo/book.jpg"
import Oval from "../ICONS/photo/Clip path group.png"
import star from "../ICONS/photo/Star 2.png"
import arrow from "../ICONS/photo/Frame 37.png"

export const HellowScrean = () => {
    return (
       <>
        
            <AuthNav/>
        
        <section className={css.banner}>
            <div className={css.bannerText}>
                <div>
                    <img src={Oval} className={css.oval} alt="BOOOK"/>
                    <h2 className={css.title}>
                        <span className={css.line1}>Планер</span> 
                        <span className={css.line2}>для твоїх думок та </span> 
                        <span className={css.line3}>справ</span>
                    </h2>

                    <p className={css.text}>Контролюй час, <br/>розставляй пріоритети та <br/>досягай більшого — <br/>легко, просто і красиво.</p>
                    <img src={star} className={css.star} alt="BOOOK"/>
                    <img src={arrow} className={css.arrow} alt="BOOOK"/>
                </div>
            </div>
                <div>
                <img src={img} className={css.pictute} alt="BOOOK"/>
                </div>
        </section>
       </>

            
    );
};
