import React , { useEffect, useState } from "react";
import RoomItem from '../components/RoomItem';
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { fetchRooms, occupiedRooms, freeRooms } from '../features/roomSlice';
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";

const TableStyle = styled.table`
  border-radius: 20px;
  border-collapse: collapse;
  background-color: white;
  width: 90%;
  margin: 0 auto;
`;
const TheadStyle = styled.thead `
  text-align: left;
  height: 65px;
  border-bottom: solid #F8F8F8 2px;
`;
const TRow = styled.tr `
  height: 90px;
  border-bottom: solid #F8F8F8 1px;
`
const PadTh= styled.th `
  padding-left: 20px;
`
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
const StyledLink= styled(Link)`
  text-decoration: none;
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
  }
}
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
  }
  ul li {
    width: 45px;
    display: flex;
    justify-content: center;
    font-size: 16px;
    padding: 5px 0;
  }
  ul li a {
    text-decoration: none;
    color: #135846;
    font-size: 16px;
  }
  ul li.active a {
    color: white;
  }
  ul li:hover, ul li:hover a,
  ul li.active {
    color: white;
    background-color: #135846;
    border-radius: 12px;
  }
  .next, .prev {
    border: 1px solid #135846;
    border-radius: 12px;
    width: 91px;
    margin: 0 20px;
  }
`

export default function RoomList({title}) {

  const [isActive, setActive] = useState(0);
  const dispatch = useDispatch();

  //Handling pagination
  const [activePage, setPage] = useState(1);
  const totalItem = 25;

  function handlePageChange(pageNumber) {
    setPage(pageNumber);
    dispatch(fetchRooms(pageNumber*10))
    setActive(0);
  }

  useEffect(() => {
    title("Room List")
    dispatch(fetchRooms(activePage*10))
  }, [activePage]);

  const roomData = useSelector(state => state.roomList.roomList); 
 
  const newRoomList = roomData.map (data =>
    (<TRow key={data.key}>
      <RoomItem  
        id={data.id} 
        index={data.index} 
        roomName={data.roomName} 
        bedType={data.bedType} 
        facilities={data.facilities} 
        rates={data.rates} 
        buttonType = {data.btype} />
    </TRow> ));  

  
  function showAllRooms(currentPage){
    dispatch(fetchRooms(currentPage))
    setActive(0)
  }
  function showOccupiedRooms() {
    dispatch(occupiedRooms())
    setActive(1)
  }
  function showFreeRooms() {
    dispatch(freeRooms())
    setActive(2)
  }
  
  return (
    <>
    <PreTable>
      <ul>
        <li 
          onClick={() => showAllRooms((activePage*10))}
          className = {isActive === 0 ? 'active' : null}>All Rooms</li>
        <li 
          onClick={() => showOccupiedRooms()}
          className = {isActive === 1 ? 'active' : null}>Occupied Rooms</li>
        <li 
          onClick={() => showFreeRooms()}
          className = {isActive === 2 ? 'active' : null}>Free Rooms</li>
      </ul>
      <StyledLink to={`/roomlist/newroom`}>+ New Room</StyledLink>
    </PreTable>
    <div>
      <TableStyle>
        <TheadStyle>
          <tr>
            <PadTh>Room Name</PadTh>
            <th>Bed Type</th>
            <th>Facilities</th>
            <th>Rate</th>
            <th>Discount</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </TheadStyle>
        <tbody>
          {newRoomList}
        </tbody>
      </TableStyle>
      <PaginWrapper>
        <p>Showing rooms {(activePage*10)-10+1} to {activePage*10} of {totalItem} rooms in total</p>
        <Pagination
            activePage={activePage}
            itemsCountPerPage={10}
            totalItemsCount={totalItem}
            pageRangeDisplayed={3}
            onChange={handlePageChange}
            prevPageText='Prev'
            nextPageText='Next'
            hideFirstLastPages= 'true'
            itemClassNext= 'next'
            itemClassPrev= 'prev'
          />
      </PaginWrapper>
    </div>
  </>
  );
}