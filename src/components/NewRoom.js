import React , { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { addRoom } from '../features/roomSlice';
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

export default function NewRoom({title}) {
	
	let history = useHistory(); 
  let { from } = { from: { pathname: "/roomList" } };

	const dispatch = useDispatch();

	useEffect(() => {
		title("New Room")
	}, [title]);
  
	const [nameInput, setNameInput] = useState();
	const [roomType, setRoomType] = useState('Deluxe A'); 
	const [bedType, setBedType] = useState('Double Bed'); 
	const [price, setPrice] = useState(); 
	const [discount, setDiscount] = useState(); 

	const [check, setCheck] = useState(true);
	
	const handleNameChange = (e) => {
		setNameInput(e.target.value);
	}
	const handleTypeChange = (e) => {
		setRoomType(e.target.value);
	}
	const handleBedChange = (e) => {
		setBedType(e.target.value);
	}
	const handlePriceChange = (e) => {
		setPrice(e.target.value);
	}
	const handleDiscountChange = (e) => {
		setDiscount(e.target.value);
	}

	const handleNewRoomSubmit = (e) => {
		e.preventDefault();
		
		if ((nameInput === undefined) || (price === undefined) || (discount === undefined)) {
			setCheck(false)
		} else {
			let newRoom = {
				roomName: nameInput,
				bedType: bedType, 
				facilities: roomType, 
				rates: price, 
				btype: 'Available'
			}
			history.replace(from);
		dispatch(addRoom(newRoom))
		}	
	}

  return (
    <>
    <FormStyled onSubmit={handleNewRoomSubmit}>
			<Title>Create a new room</Title>
				
			<label htmlFor="name">Name</label>
			<SInput autoFocus={true} type="text" id="name" onChange={handleNameChange}></SInput>
		
			<label htmlFor="roomType" onChange={handleTypeChange}>Room Type</label>
			<select>
				<option value='Deluxe A'>Deluxe A</option>
				<option value='Deluxe B'>Deluxe B</option>
				<option value='Deluxe C'>Deluxe C</option>
				<option value='Deluxe C'>Deluxe C</option>
			</select>

			<label htmlFor="bedType" onChange={handleBedChange}>Bed Type</label>
			<select>
				<option value='Double Bed'>Double Bed</option>
				<option value='Single Bed'>Single Bed</option>
				<option value='Two Single Bed C'>Two Single Bed C</option>
			</select>

			<label htmlFor="price">Price</label>
			<SInput  id="price" onChange={handlePriceChange}></SInput>

			<label htmlFor="discount">Discount</label>
			<SInput  id="discount" onChange={handleDiscountChange}></SInput>
		  
			<FormButton type="submit" value="Create"></FormButton>
			{!check ?  <p>Please fill all the fields</p> : null}
    </FormStyled>
    </>
  );
}