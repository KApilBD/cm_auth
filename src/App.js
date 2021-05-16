import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { Provider as AuthProvider } from "./context/authContext";
import { Home, Signup, Login, Admin, Profile, ForgotPassword } from "./components/pages";
import ProtectedRoutes from "./routes/ProtectedRoute";

const App = () => {
  return (
    <div>
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
    </div>
  );
};

render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
