import React, { useState}  from 'react';
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from './Logo';
import { useDispatch } from 'react-redux';
import {authenticationHanlder} from '../features/authSlice';

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
	const dispatch = useDispatch();
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

  const  handleLoginSubmit = async(e) => {
    e.preventDefault();
      
      try{
        const response = await fetch('https://backendhotelmiranda.azurewebsites.net/login', {
          method: 'POST',
					headers : { 'Content-Type' : 'application/json' },
          body: JSON.stringify({username: loginInput, password: passwordInput} )
        })
        if (response.ok){
				
					const json =  await response.json();
					
					dispatch(authenticationHanlder({status: true, token: json.token}));
					history.replace(from);
					setComb(true);
					
				} else{
					console.log('Network response was not ok')
					 //bad combination
					 setComb(false);
				}
				
      }catch (err) {
        console.log('There has been a problem with your fetch operation:', err);
				 //bad combination
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
      <p>Use the combination admin/admin to enter without registering</p>
      {!comb ?  
      <p>Wrong login or password combination </p>
       : null}

    </FormStyled>
    </>
    );
} 
  