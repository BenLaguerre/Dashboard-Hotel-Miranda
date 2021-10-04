import React from "react";
import styled from "styled-components";
import room_generic from '../images/room_generic.jpg';

const Rooms = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  align-items: center;
  background: white;
  border-radius: 12px;
  div:nth-of-type(1){
    img{
      border-radius: 8px;
      height: 70px;
      width: 130px;
    }
  }
  div:nth-of-type(2){
    margin-left: 20px;
    flex: 1;
    p:nth-of-type(1){
      font-size: 20px;
      color: #393939;
    }
    p:nth-of-type(2){
      font-size: 14px;
      color: #393939;
    }
  }
  
`
const Bar = styled.div`
  padding: 12px 22px;
  background : ${props => props.color};
  border-radius: 12px;
  color: white;
`
export default function CalendarRooms(props) {
  return (
    <>
    <Rooms>
      <div><img src={room_generic} /></div>
        <div>
          <p>{props.room}</p>
          <p>{props.name}</p>
        </div>
      <Bar color={props.color}>{parseInt(props.date.slice(-2), 10)}</Bar> 
    </Rooms>
    </>
  )
}