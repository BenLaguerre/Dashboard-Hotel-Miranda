import React from "react";
import {
  useParams
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

export default function Concierge(props) {
 
  let { id } = useParams();
  let history = useHistory(); 
  
  function goBack (){
    history.goBack();
  }

  const conciergeInfo = useSelector(state => state.conciergeList.newConciergeList[id-1]);

  return (
    <> 
    <button onClick={goBack}>Back</button> 
    <table>
      <tbody>
        <tr>
          <td>Concierge {id}</td>
          <td>{conciergeInfo.firstName} {conciergeInfo.lastName}</td>
          <td>{conciergeInfo.job}</td>
          <td>{conciergeInfo.starts}, {conciergeInfo.ends} </td>
          <td>{conciergeInfo.contact}</td>
        </tr>
      </tbody>
    </table>
    </>
  );
}