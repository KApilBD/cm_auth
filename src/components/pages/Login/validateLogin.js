import validator from 'validator';

const validateLoginForm = (values) => {
    const errors = {};
    if(!validator.isEmail(values.email || '')){
        errors.email="Please provide valid email id like example@gmail.com";
    }
    if(validator.isEmpty(values.password || '')){
        errors.password="Please enter password"
    }
        return errors;
}

export default validateLoginForm;