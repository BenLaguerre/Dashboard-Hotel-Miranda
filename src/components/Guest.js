import React from "react";
import {
  useParams
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import room_generic2 from '../images/room_generic2.jpg';
import styled from "styled-components";
import { FcBusinessman } from "react-icons/fc";
import { convertDate } from './GuestItem';
import { FaPhoneAlt } from "react-icons/fa";

const PreWrapper = styled.div `
  width: 90%;
  margin: 40px auto 20px auto;
  button {
    width: 14%;
    padding: 5px 30px;
    font-family: 'Poppins';
    font-size: 16px;
    box-sizing: content-box;
    border-radius: 12px;
    background: #135846;
    color: white;
    border: 2px solid #135846;
    &:hover {
      background: #F8F8F8;
      color: #135846;
      border: 2px solid #135846;
      cursor: pointer;
    }
  }
`
const MainWrapper = styled.div `
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  width: 90%;
  margin: 0 auto;
  background: white;
  article {
    flex: 1;
    padding: 40px;
   
  }
  aside {
    flex: 1;
    background: url(${room_generic2}) no-repeat;
    background-size: cover;
    border-radius: 0 20px 20px 0;
  }
`
const GuestInfoWrapper = styled.div `
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: solid 1px #f6f6f6;
  div:nth-of-type(1) {
    margin-bottom: 20px;
    display: flex;
    align-items: flex-start;
    gap: 20px;
    div {
      flex-direction: column;
      h2 {
        font-size: 30px;
      }
      p {
        color: #799283;
        font-size: 14px;
      }
    }
  }
  div:nth-of-type(2) {
    display: flex;
    align-items: center;
    gap: 20px;
    p {
      flex: 1;
      color: #6E6E6E;
      font-size: 14px;
    }
  }
  div:nth-of-type(3) {
    display: flex;
    align-items: center;
    gap: 20px;
    p {
      flex: 1;
      font-size: 18px;
    }
  }
`

const RoomInfoWrapper = styled.div `
  div:nth-of-type(1) {
    display: flex;
    align-items: center;
    gap: 20px;
    p {
      flex: 1;
      color: #6E6E6E;
      font-size: 14px;
    }
  }
  div:nth-of-type(2) {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;
    h2,p {
      flex: 1;
      color: #212121;
      font-size: 24px;
    }
  }
  div:nth-of-type(3) {
    margin-bottom: 30px;
  }
  div:nth-of-type(4) {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-wrap: wrap;
    p {
      color: #363636;
      background: #e8f2ef;
      font-size: 16px;
      padding: 10px 16px;
      border-radius: 8px;
    }
  }
  `
const Price = styled.span `
  color: #799283;
  font-size: 14px;
  padding: 0;
  margin: 0;
` 
const Subtitle = styled.p `
  color: #6E6E6E;
  font-size: 14px;
  margin-bottom: 10px;
` 
const Available = styled.div `
  background: #5AD07A;
  padding: 15px;
  width: 300px;
  color: white;
  text-align: center;
  transform: rotate(45deg);
  position: relative;
  top: 4em;
  right: -50%;
` 
const Booked = styled.div `
  background: #E23428;
  padding: 15px;
  width: 300px;
  color: white;
  text-align: center;
  transform: rotate(45deg);
  position: relative;
  top: 4em;
  right: -50%;
` 

export default function Guest(props) {
 
  let { id } = useParams();
  
  let history = useHistory(); 
  
  function goBack (){
    history.goBack();
  }

  const guestInfo = useSelector(state => state.guestList.guestList[id-1]);
  const roomInfo = useSelector(state => state.roomList.roomList[id-1]);
 
  return (
    <>
    <PreWrapper>
      <button onClick={goBack}>Back</button>
    </PreWrapper>
    <MainWrapper>
      
      <article>
        <GuestInfoWrapper>
          <div>
            <FcBusinessman size={140} />
            <div>
              <h2>{guestInfo.firstName} {guestInfo.lastName}</h2>
              <p>ID: 256984-175{id}</p>
              <FaPhoneAlt size={20} color={'#135846'} />
            </div>
          </div>
          <div>
            <p>Check In</p>
            <p>Check Out</p>
          </div>
          <div>
            <p>{convertDate(guestInfo.checkIn)}</p>
            <p>{convertDate(guestInfo.checkOut)}</p>
          </div>
        </GuestInfoWrapper>
        <RoomInfoWrapper>
          <div>
            <p>Room Name</p>
            <p>Price</p>
          </div>
          <div>
            <h2>{roomInfo.roomName} - {id}</h2>
            <p>{roomInfo.rates}<Price> /night</Price></p>
          </div>
          <Subtitle>Description</Subtitle>
          <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  </p>
          </div> 
          <Subtitle>Facilities</Subtitle>
          <div>
            <p>{roomInfo.bedType}</p>
            <p>{roomInfo.bedType}</p>
            <p>{roomInfo.facilities}</p>
            <p>{roomInfo.bedType}</p>
            <p>{roomInfo.facilities}</p>
            <p>{roomInfo.facilities}</p>
            <p>{roomInfo.bedType}</p>
          </div>
        </RoomInfoWrapper>
      </article>
      <aside>
        {roomInfo.btype === 'Available' ? 
          <Available>{roomInfo.btype} </Available> :
          <Booked>{roomInfo.btype}</Booked>
        } 
      </aside>
    </MainWrapper>
    </>
  );
}