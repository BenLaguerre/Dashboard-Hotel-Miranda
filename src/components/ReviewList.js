import React, { useState, useEffect, useCallback } from 'react';
import ReviewItem from '../components/ReviewItem';
import update from 'immutability-helper';
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { fetchReviews } from '../features/reviewSlice';
import Pagination from "react-js-pagination";

const PreTable = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 90%;
  margin: 40px auto 20px auto;
  ul {
    display: flex;
    li {
      color: #6E6E6E;
      border-bottom: solid 2px #D4D4D4;
      padding-right: 2em;
      padding-left: 1em;
      &:hover {
        cursor: pointer;
      }
    }
    .active {
      color: #135846;
      border-bottom: solid 2px #135846;
    }
  }
`
const TableStyle = styled.table`
  border-radius: 20px;
  background-color: white;
  border-collapse: collapse;
  width: 90%;
  margin: 0 auto;
`
const TheadStyle = styled.thead `
  text-align: left;
  height: 65px;
  border-bottom: solid #F8F8F8 2px;
`
const PadTd= styled.th `
  padding-left: 20px;
`
const PaginWrapper = styled.div`
  width: 90%;
  margin: 40px auto 20px auto;
  display: flex;
  justify-content: space-between;
  p {
    color: #393939
  }
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 15px;
    li {
      width: 45px;
      display: flex;
      justify-content: center;
      font-size: 16px;
      padding: 5px 0;
      a {
        text-decoration: none;
        color: #135846;
        font-size: 16px;
      }
    }
    li.active a {
      color: white;
    }
    li:hover, li:hover a,
    li.active {
      color: white;
      background-color: #135846;
      border-radius: 12px;
    }
    .next, .prev {
      border: 1px solid #135846;
      border-radius: 12px;
      width: 91px;
    }
  }
`

export default function ReviewList({title}) {

  const dispatch = useDispatch();

  //Handling pagination
  const [activePage, setPage] = useState(1);
  const totalItem = 25;

  useEffect(() => {
    title("Reviews")
    dispatch(fetchReviews(activePage))
  }, []);

  const reviewData = useSelector(state => state.reviewList.reviewList); 

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
    { return (<ReviewItem 
      key={data.key} 
      id={data.id} 
      index={index} 
      date={data.date} 
      firstName={data.firstName} 
      lastName={data.lastName} 
      rating={data.rating} 
      comment={data.comment} 
      moveCard={moveCard}/>);  }   
  
  const handlePageChange = newPage => {
    setPage(newPage);
    dispatch(fetchReviews(newPage));
  };
  
  return (
    <> 
    <PreTable>
      <ul>
        <li className = 'active'>All Reviews</li>
      </ul>
    </PreTable>
    <div>
      <TableStyle>
        <TheadStyle>
          <tr>
            <PadTd>Customer</PadTd>
            <th>Date</th>
            <th>Comment</th>
          </tr>
        </TheadStyle>
        <tbody> 
          {cards.map((data, i ) => newReviewList(data,i))}
        </tbody>
      </TableStyle>
      <PaginWrapper>
        <p>Showing reviews {(activePage*10)-10+1} to {activePage*10} of {totalItem} reviews in total</p>
        <Pagination
            activePage={activePage}
            itemsCountPerPage={10}
            totalItemsCount={totalItem}
            pageRangeDisplayed={3}
            onChange={handlePageChange}
            prevPageText='Prev'
            nextPageText='Next'
            hideFirstLastPages= {true}
            itemClassNext= 'next'
            itemClassPrev= 'prev'
          />
      </PaginWrapper>
    </div>
    </>
  );
}