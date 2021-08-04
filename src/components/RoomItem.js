import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import styled from "styled-components";
import { useDispatch } from 'react-redux'
import { deleteRoom } from '../features/roomSlice'

const CheckBox= styled.td `
  padding-left: 20px;
`;

export default function RoomItem(props) {

  const dispatch = useDispatch();

  return (

    <>
      <CheckBox><input type="checkbox"></input></CheckBox>
      <td><Link to={`/roomlist/${props.index+1}`}>{props.roomName}</Link></td>
      <td>{props.bedType}</td>
      <td>{props.facilities}</td>
      <td>{props.rates}/night</td>
      <td>{props.buttonType === "Booked" ? <Button color ="#E23428" name= {props.buttonType}/> : <Button color = "#5AD07A" name = {props.buttonType} />}
      </td>
      <td><button onClick={() => dispatch(deleteRoom(props.index+1))}>Delete</button></td>
    </>

    );                        
} 
