import React from "react";
import {
  useParams
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

export default function Review(props) {
 
  let { id } = useParams();
  let history = useHistory(); 
  
  function goBack (){
    history.goBack();
  }

  const reviewInfo = useSelector(state => state.reviewList.newReviewList[id-1]);
 
  return (
    <> 
    <button onClick={goBack}>Back</button>
    <table>
      <tbody>
        <tr>
          <td>Review {id}</td>
          <td>{reviewInfo.date}</td>
          <td>{reviewInfo.firstName} {reviewInfo.lastName} </td>
          <td>{reviewInfo.rating}</td>
          <td>{reviewInfo.comment}</td>
        </tr>
      </tbody>
    </table>
    </>
  );
}