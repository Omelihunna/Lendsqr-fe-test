import * as Yup from "yup"

export const LoginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("This is not a valid Email Address")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must not be less than 8 characters")
        .required("Password is required"),
});