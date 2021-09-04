import React, { useState}  from 'react';
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from './Logo';

const LogoWrapper = styled.div`
  background: white;
  display:flex;
  justify-content: center;
`
const  FormStyled = styled.form`
  background: white;
	width: 25%;
  min-width: 300px;
	padding: 30px 50px;
	box-shadow: 0px 4px 4px #00000005;
	border-radius: 20px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 20px;
	position: relative;
  top: 10vh;
  font-family: 'Poppins';
  label {
    color: #135846;
  }
  p:nth-of-type(1){
    grid-column:1/3;
    color: #135846;
  }
  p:nth-of-type(2){
    grid-column:1/3;
    color: #E23428;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
const Title = styled.h1 `
	text-align: center;
	grid-column: 1/3;
`
const SInput = styled.input `
	background: #F8F8F8;
	border: none;
	border: 2px solid grey;
	border-radius: 12px;
	padding: 8px 12px;
	&:focus {
		outline : none;
    border-color: #135846;
	}
`
const FormButton = styled.input `
  font-family: 'Poppins';
  font-size: 16px;
	box-sizing: content-box;
	padding: 0;
	border-radius: 12px;
	background: #135846;
	color: white;
	border: 2px solid #135846;
	height: 45px;
	&:hover {
		background: #F8F8F8;
		color: #135846;
		border: 2px solid #135846;
	}
`
const SLink = styled(Link) `
	color: #135846;
	text-align: center;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
}
`

export default function Login(props) {
  let history = useHistory(); 
  let { from } = { from: { pathname: "/dashboard" } };
  
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');  
  const [comb, setComb] = useState(true);
  
  const handleLoginChange = (e) => {
    setLoginInput(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    let hardcodedLogs = {
        login: 'admin',
        password: 'admin'
      }
    if ((loginInput === hardcodedLogs.login) && (passwordInput === hardcodedLogs.password)) {
      props.authenticate(true);
      props.loginNavBar()
      history.replace(from);
      setComb(true);
      
    } else {
      //bad combination
      setComb(false);
    }
  }

  return (
    <>
    <LogoWrapper> <Logo /></LogoWrapper>
    <FormStyled onSubmit={handleLoginSubmit}>
      
      <Title>Log In</Title>
      <label htmlFor="login">Login : </label>
      <SInput autoFocus={true} type="login" id="login"  name="login" onChange={handleLoginChange}></SInput>
      
      <label htmlFor="password">Password : </label>
      <SInput type="password" id="password" name="password" onChange={handlePasswordChange}></SInput>

      <FormButton type="submit" value="Log in"></FormButton>
      <div><SLink to="/register"> Register </SLink></div>
      <p>Use the combination admin/admin to enter without registering</p>
      {!comb ?  
      <p>Wrong login or password combination </p>
       : null}
    </FormStyled>
    </>
    );
} 
  