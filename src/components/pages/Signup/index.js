import { useContext, useEffect, useState } from "react";
import { Form } from "react-final-form";
import { Context as AuthContext } from "../../../context/authContext";
import { Link, useHistory } from "react-router-dom";

import validateSignupForm from "./signupValidator";

import { InputField } from "../../atom";
const Signup = () => {
  const { state, signup } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState();

  const history = useHistory();
  
  useEffect(() => {
    if (state.email) {
      history.replace("/login");
    }
    if (state.errorMessage) {
      setErrorMessage(state.errorMessage);
      console.log("ERRPRR", state.errorMessage);
    }
  }, [state]);

  useEffect(() => {
    setErrorMessage("");
  }, []);

  function onSignup(data) {
    if (data.password === data.confirmPassword) {
      signup({ email: data.email, password: data.password });
    }
  }

  return (
    <>
      <div>
        <h2 className="w-full text-center text-3xl my-5">Sign up</h2>
        <div className="max-w-lg mx-auto text-center">
          <Form
            onSubmit={onSignup}
            validate={validateSignupForm}
            render={({ handleSubmit, submitting }) => (
              <form className="card-style" onSubmit={handleSubmit}>
                <div>
                  <label className="search-label">
                    Email:
                    <InputField
                      {...{
                        name: "email",
                        placeholder: "Enter your email",
                        type: "text",
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label className="search-label">
                    Password:
                    <InputField
                      {...{
                        name: "password",
                        placeholder: "Enter your password",
                        type: "password",
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label className="search-label">
                    Confirm Password:
                    <InputField
                      {...{
                        name: "confirmPassword",
                        placeholder: "Reenter password",
                        type: "password",
                      }}
                    />
                  </label>
                </div>
                <div>
                  <button
                    className="search-control hover:opacity-80"
                    type="submit"
                  >
                    Signup
                  </button>
                  {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                  )}
                </div>
              </form>
            )}
          />
          <p>
            Already have account ?{" "}
            {
              <Link className="text-indigo-600 mt-4" to="/login">
                Login
              </Link>
            }
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
