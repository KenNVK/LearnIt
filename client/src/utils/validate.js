import * as Yup from "yup";

const ValidateSignin = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address!")
    .required("Email is required!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters !")
    .required("Password is required!"),
});
const ValidateSignUp = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  email: Yup.string()
    .email("Please enter a valid email address!")
    .required("Email is required!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters !")
    .required("Password is required!"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required!"),
});
const ValidateForm = Yup.object().shape({
  title: Yup.string().required("Title is required!"),
  description: Yup.string().max(100, "The maximum length of a description is 100 characters"),
  url: Yup.string().matches(
    /((https?):\/\/(www\.)?[a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*))/,
    "Please enter a valid url of website!"
  ),
  image: Yup.string(),
});

export { ValidateSignUp, ValidateSignin, ValidateForm };
