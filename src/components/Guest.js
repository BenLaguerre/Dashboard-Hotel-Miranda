import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import room_generic2 from '../images/room_generic2.jpg';
import styled from "styled-components";
import { convertDate } from './GuestItem';
import { fetchRooms} from '../features/roomSlice';
import { fetchGuests} from '../features/guestSlice';

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
    display: flex;
    align-items: flex-end;
    background: url(${room_generic2}) no-repeat;
    background-size: cover;
    border-radius: 0 20px 20px 0;
    div {
      padding: 20px;
      background: rgb(128,128,128,0.6);
      transition: background 0.5s;
      &:hover{
        background:  rgb(128,128,128,0.9);
       
      }
      p {
        color: white;
      }
    }
  }
`
const GuestInfoWrapper = styled.div `
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: solid 1px #f6f6f6;
  div:nth-of-type(1) {
    h2 {
      font-size: 30px;
    }
  }
  div:nth-of-type(2) {
    display:flex;
    margin-bottom: 30px;
    p {
      color: #799283;
      font-size: 14px;
    }
  }
  div:nth-of-type(3) {
    display: flex;
    align-items: center;
    gap: 20px;
    p {
      flex: 1;
      color: #6E6E6E;
      font-size: 14px;
    }
  }
  div:nth-of-type(4) {
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

export default function Guest() {
 
  const dispatch = useDispatch();
  
  let { id } = useParams();
  let history = useHistory(); 
  
  //The id from useParams goes from 1 to 20 but the indice of each element in each page goes from 0 to 9. 
  //This formula allows to converts the range 1-10 to 0-9 and 11-20 to 0-9.
  
  let indice = id - 1 - ((Math.floor((id-1)/10))*10);
  useEffect(() => {
    dispatch(fetchRooms({page: 1, filt : 0})); //To change to adapt
    dispatch(fetchGuests({page: (Math.ceil(id/10)), filt : 0}));
  }, []);

  function goBack (){
    history.goBack();
  }

  
  const guestInfo = useSelector(state => state.guestList.guestList[indice]);
  const roomInfo = useSelector(state => state.roomList.roomList[indice]);
 
  if (!roomInfo || !guestInfo ){
    return null
  }
  
  return (
    <>
    <PreWrapper>
      <button onClick={goBack}>Back</button>
    </PreWrapper>
    <MainWrapper>
      
      <article>
        <GuestInfoWrapper>
          <div>
            <h2>{guestInfo.name}</h2>
          </div>
          <div>
            <p>ID: 256984-175{id}</p>
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
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  </p>
        </div> 
      </aside>
    </MainWrapper>
    </>
  );
}