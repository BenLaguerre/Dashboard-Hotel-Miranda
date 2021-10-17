import React , { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { addRoom } from '../features/roomSlice';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
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
	input:nth-of-type(4) {
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

export default function NewRoom({title}) {
	
	let history = useHistory(); 
  let { from } = { from: { pathname: "/roomList" } };

	const dispatch = useDispatch();
	const status = useSelector(state => state.roomList.status);
	
	useEffect(() => {
		title("New Room")
	}, [title]);
  
	const { register, handleSubmit, formState: { errors } } = useForm();
	const onSubmit = newRoom => {
		dispatch(addRoom(newRoom));
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
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
			<h1>Create a new room</h1>
			
			<label htmlFor="name">Name</label>
			<input autoFocus={true} type="text" id="name" 
				{...register("name", {
          required: true,
          maxLength: 20,
          pattern: /^[A-Za-z]+$/i
        })}>
			</input>
			{errors?.name?.type === "required" && <p>This field is required</p>}
			{errors?.name?.type === "maxLength" && (
				<p>Name cannot exceed 20 characters</p>
			)}
			{errors?.name?.type === "pattern" && (
				<p>Alphabetical characters only</p>
			)}
		
			<label htmlFor="bed" >Bed Type</label>
			<select {...register("bed")}>
				<option value='Single Bed'>Single Bed</option>
				<option value='Double Bed'>Double Bed</option>
				<option value='Two Single Bed'>Two Single Beds </option>
				<option value='Triple Bed'>Triple Bed</option>
			</select>

			<label htmlFor="price">Price</label>
			<input  id="price"  {...register("price", { required: true, pattern: /^[0-9]*$/i })}></input>
			{errors?.price?.type === "required" && <p>This field is required</p>}
			{errors?.price?.type === "pattern" && (
				<p>Numbers only</p>
			)}
			<label htmlFor="photo" >Upload Pictures</label>
			<input  id="photo" disabled="disabled"  placeholder="Coming soon"></input>
		  
			<input type="submit" value="Create"></input>
    </FormStyled>
    </>
  );
}