import React from "react";
import css from "./Progres.module.css";

export const ProgressBar = ({ percentage }) => {
    return (
        <div>

        
        <div className={css.container}>
            <span className={css.percentage}>{percentage}%</span>
            <div className={css.progress} style={{ width: `${percentage}%` }}></div>
        </div>
        </div>
    );
};
