import React , { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { addConcierge } from '../features/conciergeSlice';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const  FormStyled = styled.form`
	font-family: 'Poppins';
	background: white;
	width: 30%;
	padding: 30px 50px;
	box-shadow: 0px 4px 4px #00000005;
	border-radius: 20px;
	margin: 50px auto 0 auto;
	label {
		color: #135846;
		display: block;
		margin-top: 25px;
		margin-bottom: 10px;
	}
	input {
		display: block;
		box-sizing: border-box;
		width: 100%;
		background: #F8F8F8;
		border: none;
		border: 2px solid #135846;
		border-radius: 12px;
		padding: 8px 12px;
		&:focus {
			outline : none;
				border-color: #135846;
		}
	}
	select {
		font-family: 'Poppins';
		width: 100%;
		color: #135846;
		background: #F8F8F8;
		border-radius: 12px;
		border: 2px solid #135846;
		padding: 8px 12px;
	}
	p { 
		font-family: 'Poppins';
		color: red 
	}
	input:nth-of-type(6) {
		margin-top: 25px;
		font-family: 'Poppins';
		font-size: 20px;
		border-radius: 12px;
		background: #135846;
		color: white;
		border: 2px solid #135846;
		height: 60px;
		&:hover {
			background: #F8F8F8;
			color: #135846;
			border: 2px solid #135846;
		}
	}
}
`

export default function NewConcierge({title}) {
	
	let history = useHistory(); 
	let { from } = { from: { pathname: "/conciergelist" } };

	const dispatch = useDispatch();
	const status = useSelector(state => state.conciergeList.status);

	useEffect(() => {
		title("New Employee")
	}, [title]);

	const { register, handleSubmit, formState: { errors } } = useForm();
	const onSubmit = newConcierge => {
		dispatch(addConcierge({...newConcierge, name: newConcierge.firstName + ' ' + newConcierge.lastName}));
		setTimeout(function() {
			if (status === 'succeeded'){
			history.replace(from)
			}
		}, 3000);
	}
	
	return (
	<>
	<ToastContainer
			autoClose={1000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
	<FormStyled onSubmit={handleSubmit(onSubmit)}>
		<h1>New employee</h1>
			
		<label htmlFor="firstname">First Name</label>
		<input autoFocus={true} type="text" id="firstname" {...register("firstName", {
          required: true,
          maxLength: 20,
          pattern: /^[A-Za-z]+$/i
        })}>
		</input>
		{errors?.firstName?.type === "required" && <p>This field is required</p>}
		{errors?.firstName?.type === "maxLength" && (
			<p>Name cannot exceed 20 characters</p>
		)}
		{errors?.firstName?.type === "pattern" && (
			<p>Alphabetical characters only</p>
		)}

		<label htmlFor="lastname">Last Name</label>
		<input autoFocus={true} type="text" id="lastname" {...register("lastName", {
          required: true,
          maxLength: 20,
          pattern: /^[A-Za-z]+$/i
		})}></input>
		{errors?.lastName?.type === "required" && <p>This field is required</p>}
		{errors?.lastName?.type === "maxLength" && (
			<p>Name cannot exceed 20 characters</p>
		)}
		{errors?.lastName?.type === "pattern" && (
			<p>Alphabetical characters only</p>
		)}

		<label htmlFor="joinDate">Join Date</label>
		<input  id="joinDate" type="date" {...register("join_date", {
          required: true
		})}></input>
		{errors?.join_date?.type === "required" && <p>This field is required</p>}

		<label htmlFor="phone">Phone Number</label>
		<input  id="phone"	{...register("phone_number", {
          required: true,
					minLength: 8,
          maxLength: 10,
          pattern: /^[0-9]*$/i
        })}></input>
		{errors?.phone_number?.type === "required" && <p>This field is required</p>}
		{errors?.phone_number?.type === "maxLength" && (
			<p>Phone number cannot exceed 10 digits</p>
		)}
		{errors?.phone_number?.type === "minLength" && (
			<p>Phone number have at least 8 digits</p>
		)}
		{errors?.phone_number?.type === "pattern" && (
			<p>Numbers only</p>
		)}

		<label htmlFor="description">Description</label>
		<input  id="description" {...register("job_description", {
          required: true,
          pattern: /^[A-Za-z ]+$/
		})}></input>
		{errors?.job_description?.type === "required" && <p>This field is required</p>}
		{errors?.job_description?.type === "pattern" && (
			<p>Alphabetical characters only</p>
		)}

		<input type="submit" value="Create"></input>
	</FormStyled>
	</>
  );
}