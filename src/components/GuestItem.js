import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import room_generic from '../images/room_generic.jpg';

const TD = styled.td `
  padding-left:20px;
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
const SButton = styled.button`
  border: 1px solid #799283;
  border-radius: 12px;
  color: #799283;
  background: white;
  width: 120px;
  height: 45px;
  &:hover {
    cursor: pointer;
  }
`
const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`
const Image = styled.img `
  border-radius: 8px;
  height: 70px;
  width: 130px;
`

//Function that converts the dates in a human-readable format
export function convertDate (date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  let formatedDate = new Date(date)
  return formatedDate.toLocaleDateString('en-EN',options)
}

export default function GuestItem(props) {
  return (
    <>
      <TD><StyledLink to={`/booking/${props.id}`} >{props.name}</StyledLink></TD>
      <td>{convertDate(props.orderDate)}</td>
      <td>{convertDate(props.checkIn)}</td>
      <td>{convertDate(props.checkOut)}</td>
      <td><SButton>View Notes</SButton></td>
      <td><ImgWrapper><Image src={room_generic}></Image>9584-{props.room}</ImgWrapper></td>
    </>
  );                        
} 
