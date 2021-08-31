import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { fetchRooms} from '../features/roomSlice';
import room_generic2 from '../images/room_generic2.jpg';
import styled from "styled-components";

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
  }
  aside {
    flex: 1;
    background: url(${room_generic2}) no-repeat;
    background-size: cover;
    border-radius: 0 20px 20px 0;
  }
`;
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
  top: 2.2em;
  right: -60%;
` 
const Booked = styled.div `
  background: #E23428;
  padding: 15px;
  width: 300px;
  color: white;
  text-align: center;
  transform: rotate(45deg);
  position: relative;
  top: 2.2em;
  right: -60%;
` 

export default function Room({title}) {
  
  const dispatch = useDispatch();
  
  let { id } = useParams();
  let history = useHistory(); 
  
  //The id from useParams goes from 1 to 20 but the indice of each element in each page goes from 0 to 9. 
  //This formula allows to converts the range 1-10 to 0-9 and 11-20 to 0-9.
  let indice = id - 1 - ((Math.floor((id-1)/10))*10);

  useEffect(() => {
    dispatch(fetchRooms({page: (Math.ceil(id/10)), filt : 0}));
    console.log(Math.floor((id-1)/10))
  }, []);

  const roomInfo = useSelector(state => state.roomList.roomList[indice]);

  function goBack (){
    history.goBack();
  }

  if (!roomInfo){
    return null
  }

  return (
    <> 
    <PreWrapper>
      <button onClick={goBack}>Back</button>
    </PreWrapper>
    <MainWrapper>
      <article>
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