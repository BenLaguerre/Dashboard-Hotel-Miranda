import React, { useContext } from 'react';
import {FaHotel} from 'react-icons/fa';
import styled from "styled-components";

const LogoTitle = styled.div `
width: 67%;
height: 80px;
display: flex;
align-items: center;
gap: 10px;
h1 {
	color: black;
	font-size: 24px;
}
p {
	color: #5D5449;
	font-size: 10px;
	font-family: 'Poppins', sans-serif;
}
`
export default function Logo(props) {
	return (

	<LogoTitle>
		<FaHotel size={32} color={'#135846'} />
		<div>
		<h1>travl</h1>
		<p>Hotel Admin Dashboard</p>
		</div>
	</LogoTitle>
	
	);
}