import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";

import {Context as AuthContext} from "../context/authContext";

export default function ProtectedRoute({ component: Component, ...rest }) {
    const { state } = useContext(AuthContext);
  
    return (
      <Route
        {...rest}
        render={props => {
          return state.isAdmin 
            ? <Component {...props} /> 
            : <Redirect to="/" /> 
        }}
      ></Route>
    )
  }