import { auth } from "../../firebase";
import createContext from "./createContext";

const initialState = {
  name: "",
  email: "",
  isloggedIn: false,
  isAdmin: false,
  errorMessage: "",
  message: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "signup_success":
      console.log(action.payload.email);
      return { ...state, ...action.payload };
    case "login_success":
      console.log(action.payload.email);
      return { ...state, ...action.payload };
    case "change_password_success":
        return {...state,...action.payload}
    case "auth_fail":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const resetState = (dispatch) => () => {
    dispatch({ type: "reset" });
  };

const signup =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      console.log(email, password);
      const res = await auth.createUserWithEmailAndPassword(email, password);
      const user = auth.currentUser;
      console.log("User:", user);
      dispatch({
        type: "signup_success",
        payload: {
          name: user.displayName,
          email: user.email,
        },
      });
    } catch (error) {
      dispatch({
        type: "auth_fail",
        payload: { errorSignup: "Signin failed tey again later" },
      });
    }
  };

const forgotPassword =
  (dispatch) =>
  async ({ email }) => {
    try {
      console.log(email);
      const res = await auth.sendPasswordResetEmail(email);
      console.log("User:", res);
      auth.currentUser;
      dispatch({
        type: "change_password_success",
        payload: {
          message: "Please check yor mail to reset password",
        },
      });
    } catch (error) {
      dispatch({
        type: "auth_fail",
        payload: { errorSignup: "Signin failed try again later" },
      });
    }
  };

const login =
  (dispatch) =>
  async ({ email, password, isAdmin }) => {
    try {
      const res1 = await auth.signInWithEmailAndPassword(email, password);
      //   console.log("Success: ", res);
      const user = auth.currentUser;
      console.log("User:", user);
      dispatch({
        type: "login_success",
        payload: {
          name: user.displayName,
          email: user.email,
          isloggedIn: true,
          isAdmin: isAdmin || false,
        },
      });
    } catch (error) {
      dispatch({
        type: "auth_fail",
        payload: { errorLogin: "Login failed try again later" },
      });
    }
  };

export const { Context, Provider } = createContext(
  authReducer,
  { signup, login, forgotPassword, resetState },
  { ...initialState }
);
