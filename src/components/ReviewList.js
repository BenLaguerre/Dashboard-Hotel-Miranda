import React, { useState, useEffect, useCallback } from 'react';
import ReviewItem from '../components/ReviewItem';
import update from 'immutability-helper';
import styled from "styled-components";
import { useSelector } from 'react-redux';

const TableStyle = styled.table`
  border-radius: 20px;
  background-color: white;
  width: 90%;
  margin: 100px auto 0 auto;
  border-spacing: 40px 0px;
`;
const TheadStyle = styled.thead `
  text-align: left;
  height: 65px;
  border-bottom: solid #F8F8F8 2px;
`;


const CheckBox= styled.td `
  padding-left: 20px;
`;

export default function ReviewList(props) {

  useEffect(() => {
    props.title("Reviews")
  }, []);

  const reviewData = useSelector(state => state.reviewList.newReviewList); 
  /*const reviewData = reviewJSON;*/
  const [cards, setCards] = useState(reviewData);
  const moveCard = useCallback((dragIndex, hoverIndex) => {
            const dragCard = cards[dragIndex];
            setCards(update(cards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            }));
        }, [cards]);
  
  const newReviewList = (data, index) =>
    { return (<ReviewItem key={data.key} id={data.id} index={index} date={data.date} firstName={data.firstName} lastName={data.lastName} rating={data.rating} comment={data.comment} moveCard={moveCard}/>);  }   
  
   /* const newReviewList = (card, index)  =>
  { return (<ReviewItem  key={card.id} index={index} id={card.id} date={card.date} firstName={card.first_name} lastName={card.last_name} rating={card.rating} comment={card.comment} moveCard={moveCard}/> ); } */
  
  
  return (
    <> 
        <div>
          <TableStyle>
            <TheadStyle>
              <tr>
                <CheckBox><input type="checkbox"></input></CheckBox>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </TheadStyle>
            <tbody> 
              {cards.map((data, i ) => newReviewList(data,i))}
            </tbody>
          </TableStyle>
        
      </div>
    </>
  );
}