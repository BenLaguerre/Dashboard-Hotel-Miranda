import React from "react";
import {
  useParams
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

export default function Room(props) {
 
  let { id } = useParams();
  
  let history = useHistory(); 
  
  function goBack (){
    history.goBack();
  }

  const roomInfo = useSelector(state => state.roomList.newRoomList[id-1]);
 
  return (
    <> 
    <button onClick={goBack}>Back</button>
    <table>
      <tbody>
        <tr>
          <td>Room {id}</td>
          <td>{roomInfo.roomName}</td>
          <td>{roomInfo.bedType}</td>
          <td>{roomInfo.facilities}</td>
          <td>{roomInfo.rates}</td>
          <td>{roomInfo.btype}</td>
        </tr>
      </tbody>
    </table>

    </>
  );
}