import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { deleteGuest } from '../features/guestSlice';

const TD = styled.td `
  padding-left:20px;
`;

export default function GuestItem(props) {
  
  const dispatch = useDispatch();
 
   return (
 
      <>
        <TD><Link to={`/booking/${props.index+1}`}>{props.firstName} {props.lastName}</Link></TD>
        <td>{props.orderDate}</td>
        <td>{props.checkIn}</td>
        <td>{props.checkOut}</td>
        <td><button>View Notes</button></td>
        <td>{props.roomType}</td>
        <td><button onClick={() => dispatch(deleteGuest(props.index+1))}>Delete</button></td>
      </>
     );                        
  } 
