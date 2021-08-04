import React from "react";
import {
  useParams
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

export default function Guest(props) {
 
  let { id } = useParams();
  
  let history = useHistory(); 
  
  function goBack (){
    history.goBack();
  }

  const guestInfo = useSelector(state => state.guestList.newGuestList[id-1]);
 
  return (
    <>
    <button onClick={goBack}>Back</button> 
    <table>
      <tbody>
        <tr>
          <td>Guest {id} {guestInfo.id} </td>
          <td>{guestInfo.firstName} {guestInfo.lastName}</td>
          <td>{guestInfo.orderDate}</td>
          <td>{guestInfo.checkIn}</td>
          <td>{guestInfo.checkOut}</td>
          <td>{guestInfo.roomType}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    </>
  );
}