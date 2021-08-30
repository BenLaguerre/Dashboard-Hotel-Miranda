import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const  FormStyled = styled.form`
	font-family: 'Poppins';
	background: white;
	width: 30%;
	padding: 30px 50px;
	box-shadow: 0px 4px 4px #00000005;
	border-radius: 20px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 20px;
	position: relative;
	top: 20vh;
	label {
		color: #135846;
	}
	`
const Title = styled.h1 `
	text-align: center;
	grid-column: 1/3;
`
const SInput = styled.input `
	background: #F8F8F8;
	border: none;
	border: 2px solid #135846;
	border-radius: 12px;
	padding: 4px 6px;
	&:focus {
		outline : solid #135846;
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

export default function Register(props) {
  
  return (
    <>
    <FormStyled>
			<Title>Register</Title>
				
			<label htmlFor="name">Name</label>
			<SInput autoFocus={true} type="text" id="name"></SInput>
		
			<label htmlFor="email">Email</label>
			<SInput type="email" id="email"></SInput>
		
			<label htmlFor="password">Password</label>
			<SInput type="password" id="password"></SInput>
		
			<label htmlFor="repeatPass">Repeat Password</label>
			<SInput type="password" id="repeatPass"></SInput>

			<FormButton type="submit" value="Register"></FormButton>
			<SLink to="/login">I am already registered </SLink> 
				
    </FormStyled>
    </>
  );
}