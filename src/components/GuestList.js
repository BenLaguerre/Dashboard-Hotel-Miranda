import React , { useEffect, useState } from "react";
import GuestItem from '../components/GuestItem'
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { fetchGuests} from '../features/guestSlice';
import Pagination from "react-js-pagination";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
}
`
const CalendarTool = styled.div`
  flex: 0.5;
  .react-datepicker-wrapper {
    padding: 5px 0;
    background: #135846;
    box-sizing: content-box;
    border-radius: 12px;
    border: 2px solid #135846;
    text-align: center;
  }
  input {
    color: white;
    background: #135846;
    font-size: 16px;
    border:none;
    width: 90%;
  }
`
const Newest = styled.button`
  text-decoration: none;
  padding: 5px 30px;
  font-family: 'Poppins';
  font-size: 16px;
  box-sizing: content-box;
  border-radius: 12px;
  color: #135846;
  border: 2px solid #135846;
  &:hover {
    background: #F8F8F8;
    color: #135846;
    border: 2px solid #135846;
  }
`
const TableStyle = styled.table`
  border-radius: 20px;
  border-collapse : collapse;
  background-color: white;
  width: 90%;
  margin: 0 auto;
`
const TheadStyle = styled.thead `
  text-align: left;
  height: 65px;
  border-bottom: solid #F8F8F8 2px;
`
const TH = styled.th `
  padding-left:20px;
`
const TRow = styled.tr `
  height: 90px;
  border-bottom: solid #F8F8F8 1px;
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

export default function GuestList({title}) {

  const [filter, setFilter] = useState(0);
  const dispatch = useDispatch();
   
  //Handling pagination
  const [activePage, setPage] = useState(1);
  const totalItem = 40;

<<<<<<< HEAD
=======
  let dateChosen = new Date('01/01/2022');
  dateChosen = dateChosen.getTime();

>>>>>>> main
  useEffect(() => {
    title("Bookings")
    dispatch(fetchGuests({page: activePage, filt : filter}));
  }, []);

  const guestData = useSelector(state => state.guestList.guestList); 
 
  const newGuestList = guestData.map (data =>
    (<TRow key={data.key}>
      <GuestItem 
        id={data.id} 
        index={data.index} 
        name={data.name} 
        orderDate={data.orderDate} 
        checkIn={data.checkIn} 
        checkOut={data.checkOut} 
        room={data.room} />
    </TRow> ));                          
  
  const handleFilterChange = newFilter => {
    setFilter(newFilter);
    setPage(1);
    dispatch(fetchGuests({page: 1, filt : newFilter, date: startDate}));
  };
  const handlePageChange = newPage => {
    setPage(newPage);
    dispatch(fetchGuests({page: newPage, filt : filter, date: startDate.getTime()}));
  };

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  return (
    <>
    <PreTable>
        <ul>
          <li 
            onClick={() => handleFilterChange(0)}
            className = {filter === 0 ? 'active' : null}>All Guest</li>
          <li 
            onClick={() => handleFilterChange(1)}
            className = {filter === 1 ? 'active' : null}>Entrance</li>
          <li 
            onClick={() => handleFilterChange(2)}
            className = {filter === 2 ? 'active' : null}>Exit</li>
          <li 
            onClick={() => handleFilterChange(3)}
            className = {filter === 3 ? 'active' : null}>Pending</li>
        </ul>
        
        <CalendarTool>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            onCalendarClose={() => {
              dispatch(fetchGuests({page: 1, filt : filter, date: startDate.getTime()}))
            }}
            dateFormat="d MMMM yyyy"
            placeholderText="Click to select a date range"
          />
        </CalendarTool>
    </PreTable>
    
    <div>
      <TableStyle>
        <TheadStyle>
          <tr>
            <TH>Guest</TH>
            <th>Order Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Special Request</th>
            <th>Room type</th>
            <th>Delete</th>
          </tr>
        </TheadStyle>
        <tbody>
        {newGuestList}
        </tbody>
      </TableStyle>
      <PaginWrapper>
        <p>Showing booking {(activePage*10)-10+1} to {activePage*10} of {totalItem} booking in total</p>
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