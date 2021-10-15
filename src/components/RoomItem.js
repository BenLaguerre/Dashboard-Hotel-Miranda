import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import styled from "styled-components";
import room_generic from '../images/room_generic.jpg';

const PadTd = styled.td `
  padding-left: 20px;
`
const Facilities = styled.td `
  max-width: 30%;
`
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

export default function RoomItem(props) {
  
  return (
    <>
      <PadTd><StyledLink to={`/roomlist/${props.id}`}><Image src={room_generic}></Image>{props.name}</StyledLink></PadTd>
      <td>{props.bed}</td>
      <Facilities>Ac, Shower, {props.bed},<br /> Towel, Coffee Set, LED TV, Wifi</Facilities>
      <td><b>{props.price}€</b><Rate>/night</Rate></td>
      <td>{props.status  ? <Button color ="#E23428" name= 'Booked'/> : <Button color = "#5AD07A" name = 'Available' />}
      </td>
    </>

    );                        
} 
