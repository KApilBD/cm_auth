import validator from "validator";

const validateSignupForm = (values) => {
  const errors = {};
  if (!validator.isEmail(values.email || "")) {
    errors.email = "Please provide valid email id like example@gmail.com";
  }
  if (validator.isEmpty(values.password || "")) {
    errors.password = "Please enter password";
  }
  if (validator.isEmpty(values.confirmPassword || "")) {
    errors.confirmPassword = "Please re-enter password";
  }
  if (
    !validator.isEmpty(values.password || "") &&
    !validator.isEmpty(values.confirmPassword || "") &&
    values.confirmPassword !== values.password
  ) {
    errors.password = "Password doesn't match";
    errors.confirmPassword = "Password doesn't match";
  }

  return errors;
};

export default validateSignupForm;
