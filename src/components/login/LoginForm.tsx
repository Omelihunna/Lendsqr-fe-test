import React, {useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {LoginValidationSchema} from "../../schemas/LoginValidationSchema.tsx";
import styles from "../../styles/components/login/login-form.module.scss";

interface LoginValues {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const initialValues: LoginValues = {
        email: "",
        password: "",
    };

    const handleSubmit = (values: LoginValues) => {
        console.log("Logging in with:", values);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prev => !prev);
    };

    return (
        <div className={styles["login-form"]}>
            <img src="/images/logo.svg" alt="logo" className={styles["logo"]}/>
            <section>
                <header className={styles["login-header"]}>
                    <h1>Welcome!</h1>
                    <p>Enter details to login.</p>
                </header>
                <Formik
                    initialValues={initialValues}
                    validationSchema={LoginValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({handleChange, handleSubmit, handleBlur, values}) => (
                        <Form onSubmit={handleSubmit} className={styles["form"]}>
                            <div>
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder={"Email"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    className={styles.input}
                                />
                            </div>
                            <ErrorMessage
                                name="email"
                                component="div"
                                className={styles["input-error"]}
                            />
                            <div className={styles["input-password"]}>
                                <Field
                                    id="password"
                                    name="password"
                                    type={isPasswordVisible ? "text" : "password"}
                                    placeholder="Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    className={styles.input}
                                />
                                <span
                                    className={styles["password-visible"]}
                                    onClick={togglePasswordVisibility}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            togglePasswordVisibility();
                                        }
                                    }}
                                    aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                                >
                                    {isPasswordVisible ? "HIDE" : "SHOW"}
                                </span>
                            </div>
                            <ErrorMessage
                                name="password"
                                component="div"
                                className={styles["input-error"]}
                            />
                            <p className={styles["form"] + "__forgot"}>FORGOT PASSWORD?</p>
                            <button type="submit" className={styles["submit"]}>Login</button>
                        </Form>
                    )}
                </Formik>
            </section>
        </div>
    );
};

export default LoginForm;