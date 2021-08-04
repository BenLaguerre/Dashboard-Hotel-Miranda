import React  from "react";
import RoomItem from '../components/RoomItem';
import styled from "styled-components";
import { useSelector } from 'react-redux'

const TableStyle = styled.table`
  border-radius: 20px;
  border-collapse : collapse;
  background-color: white;
  width: 90%;
  margin: 100px auto 0 auto;
`;
const TheadStyle = styled.thead `
  text-align: left;
  height: 65px;
  border-bottom: solid #F8F8F8 2px;
`;
const TRow = styled.tr `
  height: 90px;
  border-bottom: solid #F8F8F8 1px;
`;

const CheckBox= styled.td `
  padding-left: 20px;
`;

export default function RoomList(props) {

  const roomData = useSelector(state => state.roomList.newRoomList); 
  
  const newRoomList = roomData.map (data =>
    (<TRow key={data.key}><RoomItem  id={data.id} index={data.index} roomName={data.roomName} bedType={data.bedType} facilities={data.facilities} rates={data.rates} buttonType = {data.btype} /></TRow> ));  
  
  return (
    <>
    <div>
      <TableStyle>
        <TheadStyle>
          <tr>
            <CheckBox><input type="checkbox"></input></CheckBox>
            <th>Room Name</th>
            <th>Bed Type</th>
            <th>Facilities</th>
            <th>Rate</th>
            <th>Status</th>
            <th></th>
          </tr>
        </TheadStyle>
        <tbody>
        {newRoomList}
        </tbody>
      </TableStyle>
    </div>
    </>
  );
}