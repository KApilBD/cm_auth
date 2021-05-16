import validator from "validator";

const validateLoginForm = (values) => {
  const errors = {};
  if (!validator.isEmail(values.email || "")) {
    errors.email = "Please provide valid email id like example@gmail.com";
  }
  return errors;
};

export default validateLoginForm;
