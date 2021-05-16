import { useContext, useEffect } from "react";
import { Form } from "react-final-form";
import { Link } from "react-router-dom";
import { Context as AuthContext } from "../../../context/authContext";

import validateLoginForm from "./validateLogin";
import { InputField } from "../../atom";

const ForgotPassword = () => {
  const { state, forgotPassword } = useContext(AuthContext);
  console.log("State: ", state);

  function onLogin(data) {
    console.log(data);
    forgotPassword({
      email: data.email,
    });
  }

  return (
    <>
      <div>
        <h2 className="w-full text-center text-3xl my-5">Forgot Password</h2>
        {state.message ? <p className="text-center">{state.message}</p> : null}
        <div className="block max-w-lg mx-auto text-center">
          <Form
            onSubmit={onLogin}
            validate={validateLoginForm}
            render={({ handleSubmit, submitting }) => (
              <form className="form-style" onSubmit={handleSubmit}>
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
                  <button
                    className="search-control hover:opacity-80"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          />
        </div>
        <p className="text-center">
          {
            <Link className="text-blue-600 mt-4" to="/login">
              Login
            </Link>
          }
        </p>
      </div>
    </>
  );
};

export default ForgotPassword;
