import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { deleteConcierge } from '../features/conciergeSlice';

const CheckBox= styled.td `
  padding-left: 20px;
`;

export default function ConciergeItem(props) {
  const dispatch = useDispatch();

  return (

      <>
        <CheckBox><input type="checkbox"></input></CheckBox>
        <td><Link to={`/conciergelist/${props.index+1}`}>{props.firstName} {props.lastName}</Link></td>
        <td>{props.job}</td>
        <td>{props.start} {props.end}</td>
        <td>{props.contact}</td>
        <td></td>
        <td><button onClick={() => dispatch(deleteConcierge(props.index+1))}>Delete</button></td>
      </>
    );                        
} 
