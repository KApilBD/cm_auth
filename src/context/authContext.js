import { auth } from "../../firebase";
import createContext from "./createContext";

const initialState = {
  name: "",
  email: "",
  isloggedIn: false,
  isAdmin: false,
  errorMessage: "",
  message: "",
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "signup_success":
      // console.log(action.payload.email);
      return { ...state, ...action.payload, isloggedIn:false };
    case "login_success":
      // console.log(action.payload.email);
      return { ...state, ...action.payload };
    case "change_password_success":
      return { ...state, ...action.payload };
    case "auth_fail":
      return { ...state, ...action.payload };
    case "reset":
      return { ...state, ...initialState };
    case "setUser":
      // console.log("SetUser", action.payload);
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
      // console.log(email, password);
      const res = await auth.createUserWithEmailAndPassword(email, password);
      const user = auth.currentUser;
      // console.log("User:", user);
      dispatch({
        type: "signup_success",
        payload: {
          name: user.displayName,
          email: user.email,
          errorMessage:""
        },
      });
    } catch (error) {
      dispatch({
        type: "auth_fail",
        payload: { errorMessage: error.message },
      });
    }
  };

const forgotPassword =
  (dispatch) =>
  async ({ email }) => {
    try {
      // console.log(email);
      const res = await auth.sendPasswordResetEmail(email);
      // console.log("User:", res);
      auth.currentUser;
      dispatch({
        type: "change_password_success",
        payload: {
          message: "Please check yor mail to reset password",
          errorMessage:""
        },
      });
    } catch (error) {
      dispatch({
        type: "auth_fail",
        payload: { errorMessage: error.message  },
      });
    }
  };

const login =
  (dispatch) =>
  async ({ email, password, isAdmin }) => {
    try {
      const res1 = await auth.signInWithEmailAndPassword(email, password);
      //   // console.log("Success: ", res);
      const user = auth.currentUser;
      dispatch({
        type: "login_success",
        payload: {
          name: user.displayName,
          email: user.email,
          isloggedIn: true,
          isAdmin: isAdmin || false,
          errorMessage: ""
        },
      });
    } catch (error) {
      dispatch({
        type: "auth_fail",
        payload: { errorMessage: error.message },
      });
    }
  };

// const verifyToken = (dispatch) => async () => {
//   const token = localStorage.getItem("token");
//   const email = localStorage.getItem("email");
//   const currentUser = localStorage.getItem("currUser");

//   // console.log("token", token, currentUser);
//   dispatch({
//     type: "loading",
//     payload: { loading: true },
//   });

//   try {
//     if (token) {
//       // console.log("verifyData");
//       const user = auth.currentUser;

//       // const verifyData = await auth.verifyIdToken(token);
//       // // console.log("verifyData", user, currentUser);
//     }
//     dispatch({
//       type: "loading",
//       payload: { loading: false },
//     });
//   } catch (error) {
//     // // console.log("reset", error);
//     dispatch({
//       type: "reset",
//     });
//   }
// };

const setUser = (dispatch) => (user) => {
  dispatch({
    type: "setUser",
    payload: user,
  });
};

const logout = (dispatch) => async () => {
  try {
    await auth.signOut();
    dispatch({
      type: "reset",
    });
  } catch (error) {}
};

export const { Context, Provider } = createContext(
  authReducer,
  { signup, login, forgotPassword, resetState, setUser, logout },
  { ...initialState }
);
