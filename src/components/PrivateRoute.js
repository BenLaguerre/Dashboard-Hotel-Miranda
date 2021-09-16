import React from 'react';
import {
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children, ...rest }) {
  
  //const value = useContext(AuthContext);
  const value =  useSelector(state => state.auth.auth);
  console.log(value)
  return (
        <>
        <Route {...rest}>{value ? children : <Redirect to="/login" />  }</Route>
        </>
    )
}