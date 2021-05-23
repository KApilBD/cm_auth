import React, { useContext, useEffect, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { auth } from "../firebase";

import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "./context/authContext";
import {
  Home,
  Signup,
  Login,
  Admin,
  Profile,
  ForgotPassword,
} from "./components/pages";
import ProtectedRoutes from "./routes/ProtectedRoute";

const App = () => {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    auth.onAuthStateChanged((user) => {
      setLoading(true);
      if (user) {
        console.log(user.uid);
        setUser({
          name: user.displayName,
          email: user.email,
          isloggedIn: true,
        });
      } else {
        setUser({
          name: "",
          email: "",
          isloggedIn: false,
        });
      }
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-3xl">Loading...</h1>
        </div>
      ) : (
        <BrowserRouter>
          <Switch>
            <ProtectedRoutes path="/" exact component={Home} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            <Route path="/changePassword" exact component={ForgotPassword} />
            <ProtectedRoutes path="/admin" exact component={Admin} />
            <ProtectedRoutes path="/profile" exact component={Profile} />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
};

render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
