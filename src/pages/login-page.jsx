import { LoginForm } from "../components/LoginForm/LoginForm";
import css from "./logim-page.module.css"; // Import CSS module

export const LoginPage = () => {
    return (
        <div className={css.loginPage}>
            <div className={css.formSide}>
                <LoginForm />
            </div>
            <div className={css.textSide}>
                <h2>Welcome to Our Service</h2>
                <p>We offer the best solutions to help you manage your tasks. Our platform is designed to be user-friendly and intuitive, allowing you to focus on what truly matters.</p>
                <p>Join us now and experience the power of simplicity and efficiency!</p>
            </div>
            <div className={css.shapes}></div> {/* New section for shapes */}
        </div>
    );
};
