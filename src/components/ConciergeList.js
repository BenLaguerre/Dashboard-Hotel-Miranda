import React , { useEffect } from "react";
import ConciergeItem from '../components/ConciergeItem';
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

const CheckBox= styled.th `
  padding-left: 20px;
`;

export default function ConciergeList(props) {
  useEffect(() => {
    props.title("Concierge List")
  }, []);
 
  const conciergeData = useSelector(state => state.conciergeList.newConciergeList); 

  const newConciergeList = conciergeData.map (data =>
    (<TRow key={data.key}><ConciergeItem  id={data.id} index={data.index} firstName={data.fistName} lastName={data.lastName} job={data.job} start={data.starts} end={data.ends} contact={data.contact} /></TRow> ));

  return (
        <>
        
        <div>
          <TableStyle>
            <TheadStyle>
              <tr>
                <CheckBox><input type="checkbox"></input></CheckBox>
                <th>Name</th>
                <th>Job Desk</th>
                <th>Schedule</th>
                <th>Contact</th>
                <th>Status</th>
                <th></th>
              </tr>
            </TheadStyle>
            <tbody>
            {newConciergeList}
            </tbody>
          </TableStyle>
        </div>
        </>
  );
}