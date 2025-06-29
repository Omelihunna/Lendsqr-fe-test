import LoginForm from "../components/LoginForm.tsx";
import React from "react";
import styles from "../styles/pages/login/login-page.module.scss"

const LoginPage: React.FC = () => {
    return (
        <section className={styles["login-page"]}>
            <div className={styles["login-div"]}>
                <section className={styles["login-images"]}>
                    <img src="/images/logo.svg" alt="logo" className={styles["logo"]}/>
                    <div>
                        <img src="/images/login-illus.svg" alt="illustration"/>
                    </div>
                </section>
                <LoginForm/>
            </div>
        </section>
    )
}

export default LoginPage;