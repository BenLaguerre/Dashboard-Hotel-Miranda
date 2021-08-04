import React  from "react";
import GuestItem from '../components/GuestItem'
import styled from "styled-components";
import { useSelector } from 'react-redux';

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
const TH = styled.th `
  padding-left:20px;
  
`;

const TRow = styled.tr `
  height: 90px;
  border-bottom: solid #F8F8F8 1px;
`;

export default function GuestList(props) {
  const guestData = useSelector(state => state.guestList.newGuestList); 
 
  
  const newGuestList = guestData.map (data =>
    (<TRow key={data.key}><GuestItem id={data.id} index={data.index} firstName={data.firstName} lastName={data.lastName} orderDate={data.orderDate} checkIn={data.checkIn} checkOut={data.checkOut} roomType={data.roomType} /></TRow> ));                          
                                
  return (
    <>
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
            <th>Status</th>
            <th></th>
          </tr>
        </TheadStyle>
        <tbody>
        {newGuestList}
        </tbody>
      </TableStyle>
    </div>
    </>
  );
}