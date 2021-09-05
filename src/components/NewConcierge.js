import React , { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { addConcierge } from '../features/conciergeSlice';
import { useHistory } from "react-router-dom";

const  FormStyled = styled.form`
	font-family: 'Poppins';
  background: white;
	width: 30%;
	padding: 30px 50px;
	box-shadow: 0px 4px 4px #00000005;
	border-radius: 20px;
	margin: 50px auto 0 auto;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 25px;
	label {
		color: #135846;
	}
	select {
		color: #135846;
		background: #F8F8F8;
		border-radius: 12px;
		border: 2px solid #135846;
		padding: 8px 12px;
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

export default function NewConcierge({title}) {
	
	let history = useHistory(); 
	let { from } = { from: { pathname: "/conciergelist" } };

	const dispatch = useDispatch();

	useEffect(() => {
		title("New Employee")
	}, [title]);

	const [nameInput, setNameInput] = useState();
	const [joinDate, setJoinDate] = useState(); 
	const [phone, setPhone] = useState(); 
	const [description, setDescription] = useState(); 
	const [status, setStatus] = useState('Active'); 

	const [check, setCheck] = useState(true);

	const handleNameChange = (e) => {
		setNameInput(e.target.value);
	}
	const handleDateChange = (e) => {
		setJoinDate(e.target.value);
	}
	const handlePhoneChange = (e) => {
		setPhone(e.target.value);
	}
	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	}
	const handleStatusChange = (e) => {
		setStatus(e.target.value);
	}

	const handleNewConciergeSubmit = (e) => {
		e.preventDefault();
		
		if ((nameInput === undefined) || (joinDate === undefined) || (phone === undefined) || (description === undefined)) {
			setCheck(false)
		} else {
			let newConcierge = {
				name: nameInput,
				joinDate: joinDate, 
				phone: phone, 
				job: description, 
				status: status
			}
			history.replace(from);
			dispatch(addConcierge(newConcierge))
		}	
	}

	return (
	<>
	<FormStyled onSubmit={handleNewConciergeSubmit}>
			<Title>New employee</Title>
				
			<label htmlFor="name">Name</label>
			<SInput autoFocus={true} type="text" id="name" onChange={handleNameChange}></SInput>

			<label htmlFor="joinDate">Join Date</label>
			<SInput  id="joinDate" onChange={handleDateChange}></SInput>

			<label htmlFor="phone">Phone Number</label>
			<SInput  id="phone" onChange={handlePhoneChange}></SInput>

			<label htmlFor="description">Description</label>
			<SInput  id="description" onChange={handleDescriptionChange}></SInput>
			
			<label htmlFor="roomType" onChange={handleStatusChange}>Status</label>
			<select>
				<option value='Active'>Active</option>
				<option value='Inactive'>Inactive</option>
			</select>

			<FormButton type="submit" value="Create"></FormButton>
			{!check ?  <p>Please fill all the fields</p> : null}
	</FormStyled>
	</>
  );
}