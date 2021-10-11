import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { fetchOneConcierge} from '../features/conciergeSlice';
import { convertDate } from './GuestItem';
import { FaPhoneAlt } from "react-icons/fa";

const PreWrapper = styled.div `
  width: 60%;
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
  width: 60%;
  margin: 0 auto;
  background: white;
  article {
    flex: 1;
    padding: 40px;
    div:nth-of-type(1) {
      display: flex;
      align-items: center;
      gap: 20px;
      h2 {
        flex: 1;
        color: #212121;
        font-size: 30px;
      }
      p {
        display: flex;
        gap: 20px;
        flex: 1;
        color: #212121;
        font-size: 22px;
        svg {
          align-self: center;
        }
      }
    }
    div:nth-of-type(2) {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 30px;
      p {
        flex: 1;
        color: #799283;
        font-size: 16px;
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
      margin-bottom: 30px;
      p {
        font-size: 18px;
        flex: 1;
      }
    }
  }
`
const Subtitle = styled.p `
  color: #6E6E6E;
  font-size: 14px;
  margin-bottom: 10px;
` 
const Status= styled.p `
  color : ${props => props.color};
  font-weight: bold;
`

export default function Concierge(props) {

  const dispatch = useDispatch();
  let { id } = useParams();
  let history = useHistory(); 

  useEffect(() => {
    //dispatch(fetchRooms({page: (Math.ceil(id/10)), filt : 0}));
    dispatch(fetchOneConcierge({id: id}));
  }, []);
  
  const conciergeInfo = useSelector(state => state.conciergeList.oneConcierge);
  
  function goBack (){
    history.goBack();
  }

  if (!conciergeInfo){
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
          <h2>{conciergeInfo.name}</h2>
          <p><FaPhoneAlt /> {conciergeInfo.phone_number}</p>
        </div>
        <div>
          <p>ID: 256984-175{id}</p>
        </div>
        <div>
          <p>Join on </p>
          <p>Status</p>
        </div>
        <div>
          <p>{convertDate(conciergeInfo.join_date)}</p>
          <p> {conciergeInfo.status === 1 ? <Status color= {'green'}>ACTIVE</Status> : <Status color= {'red'}>INACTIVE</Status>}</p>
        </div>
        <Subtitle>Description</Subtitle>
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  </p>
        </div> 
        </article>
      </MainWrapper>
    </>
  );
}