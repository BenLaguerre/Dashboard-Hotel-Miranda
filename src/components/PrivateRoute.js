import React from 'react';
import {
  Route,
  Redirect,
} from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
  const authenticated = localStorage.getItem('authenticated');
  return (
        <>
        <Route {...rest}>{authenticated ? children : <Redirect to="/login" />  }</Route>
        </>
    )
}