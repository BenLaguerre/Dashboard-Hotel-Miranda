import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { deleteRoom } from '../features/roomSlice';
import { TiDeleteOutline } from "react-icons/ti";
import room_generic from '../images/room_generic.jpg';

const PadTd = styled.td `
  padding-left: 20px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #393939;
  display: flex;
  align-items: center;
  gap: 20px;
  opacity: 1;
  transition: filter 0.5s;
  transition: opacity 0.5s;
  &:hover{
    opacity: 0.7;
  }
`
const Image = styled.img `
  border-radius: 8px;
  height: 70px;
  width: 130px;
  `
const Rate = styled.span `
  color: #799283;
  font-size: 14px;
  padding: 0;
  margin: 0;
` 
const Delete = styled(TiDeleteOutline) `
  color: red;
  display: flex;
  &:hover {
    cursor: pointer;
  }
`
export default function RoomItem(props) {

  const dispatch = useDispatch();

  return (
    <>
      <PadTd><StyledLink to={`/roomlist/${props.index+1}`}><Image src={room_generic}></Image>{props.roomName}</StyledLink></PadTd>
      <td>{props.bedType}</td>
      <td>{props.facilities}</td>
      <td><b>{props.rates}</b><Rate>/night</Rate></td>
      <td><b>{props.rates}</b><Rate>/night</Rate></td>
      <td>{props.buttonType === "Booked" ? <Button color ="#E23428" name= {props.buttonType}/> : <Button color = "#5AD07A" name = {props.buttonType} />}
      </td>
      <td><Delete size={26} onClick={() => dispatch(deleteRoom(props.index+1))} ></Delete></td>
    </>

    );                        
} 
