import React, { useContext } from 'react';
import { AuthContext } from '../App.js';
import {
  Route,
  Redirect,
} from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
  
  const value = useContext(AuthContext);

  return (
        <>
        <Route {...rest}>{value ? children : <Redirect to="/login" />  }</Route>
        </>
    )
  
 
}