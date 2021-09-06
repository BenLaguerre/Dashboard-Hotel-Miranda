import React , { useEffect, useState } from "react";
import RoomItem from '../components/RoomItem';
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { fetchRooms} from '../features/roomSlice';
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";

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
`
const TRow = styled.tr `
  height: 90px;
  border-bottom: solid #F8F8F8 1px;
`
const PadTh= styled.th `
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

export default function RoomList({title}) {
  
  const [filter, setFilter] = useState(0);
  const dispatch = useDispatch();

  //Handling pagination
  const [activePage, setPage] = useState(1);
  const totalItem = 25;

  useEffect(() => {
    title("Rooms")
    dispatch(fetchRooms({page: activePage, filt : filter}));
  }, []);

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

  const handleFilterChange = newFilter => {
    setFilter(newFilter);
    setPage(1);
    dispatch(fetchRooms({page: 1, filt : newFilter}));
  };
  const handlePageChange = newPage => {
    setPage(newPage);
    dispatch(fetchRooms({page: newPage, filt : filter}));
  };

  return (
    <>
    <PreTable>
      <ul>
        <li 
          onClick={() => handleFilterChange(0)}
          className = {filter === 0 ? 'active' : null}>All Rooms</li>
        <li 
          onClick={() => handleFilterChange(1)}
          className = {filter === 1 ? 'active' : null}>Occupied Rooms</li>
        <li 
          onClick={() => handleFilterChange(2)}
          className = {filter === 2 ? 'active' : null}>Free Rooms</li>
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