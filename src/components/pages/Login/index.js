import { useContext, useEffect, useState } from "react";
import { Form } from "react-final-form";
import { Link, useHistory } from "react-router-dom";
import { Context as AuthContext } from "../../../context/authContext";

import validateLoginForm from "./validateLogin";
import { InputField, CheckboxField } from "../../atom";

const Login = () => {
  const { state, login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  useEffect(() => {
    if (state.isloggedIn) {
      history.push("/");
    }
    if (state.errorMessage) {
      setErrorMessage(state.errorMessage);
    }
  }, [state]);

  useEffect(() => {
    setErrorMessage("");
  }, []);

  function onLogin(data) {
    login({ email: data.email, password: data.password, isAdmin: data.admin });
  }

  return (
    <>
      <div>
        <h2 className="w-full text-center text-3xl my-5">Log in</h2>
        <div className="block max-w-lg mx-auto text-center">
          <Form
            onSubmit={onLogin}
            validate={validateLoginForm}
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
                    Select to login as Admin:
                    <CheckboxField
                      type="checkbox"
                      name="admin"
                      label="Select to login as Admin"
                    />
                  </label>
                </div>
                <div>
                  <button
                    className="search-control hover:opacity-80"
                    type="submit"
                  >
                    Login
                  </button>
                  {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                  )}
                </div>
              </form>
            )}
          />
          <div className="flex justify-center mt-2">
            <p className="px-3 border-r-2 ">
              {
                <Link className="text-blue-600 mt-4" to="/signup">
                  Signup
                </Link>
              }
            </p>

            <p className="px-3">
              {
                <Link className="text-blue-600 mt-4" to="/changePassword">
                  Forgot Password
                </Link>
              }
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
