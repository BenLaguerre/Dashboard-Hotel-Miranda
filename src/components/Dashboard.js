import React , { useEffect, useState } from "react";
import styled from "styled-components";
import { IoBedOutline } from "react-icons/io5";
import { RiCalendarCheckLine } from "react-icons/ri";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import Calendar from 'react-calendar';

const DashWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  column-gap: 40px;
  
` 
const KpiWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  width: 100%;
  gap: 40px;
` 
const KPI = styled.div `
  background: white;
  display: flex;
  align-items: center;
  flex: 1;
  padding: 1.5%;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 12px;
  &:hover 
    {
      box-shadow: 0px 16px 30px #00000014;
    }
`
const Bed = styled(IoBedOutline) `
  background: #FFEDEC;
  padding: 4%;
  color: #E23428;
  border-radius: 8px;
  ${KPI}:hover & {
    color: white;
      background: #E23428;
  }
`
const Booking = styled(RiCalendarCheckLine) `
  background: #FFEDEC;
  padding: 4%;
  color: #E23428;
  border-radius: 8px;
  ${KPI}:hover & {
    color: white;
      background: #E23428;
  }
`
const Login = styled(BiLogIn) `
  background: #FFEDEC;
  padding: 4%;
  color: #E23428;
  border-radius: 8px;
  ${KPI}:hover & {
    color: white;
      background: #E23428;
  }
`
const Logout = styled(BiLogOut) `
  background: #FFEDEC;
  padding: 4%;
  color: #E23428;
  border-radius: 8px;
  ${KPI}:hover & {
    color: white;
    background: #E23428;
  }
`
const Number = styled.div `
  flex: 1;
  margin-left: 8%;
  h2 {
    color: #393939;
    font-size: 30px;
    margin-bottom: -10px;
  }
  p {
    color: #787878;
    font-size: 14px;
  }
`
const CalendarWrapper = styled.div`
  box-shadow: 0px 4px 4px #00000005;
  flex:1;
  display:flex;
  flex-direction: column;
  align-items:center;
  justify-content: space-between;
  border-radius: 20px;
  background: white;
  p {
    margin: 30px 0 30px 40px;
    color: #393939;
    font-size: 20px;
    align-self: flex-start;
  }
`

export default function Dashboard({title}) {

  const [activeDate, setDate] = useState([new Date('09/11/2021'), new Date('09/13/2021')]);
  
  const changeDate = (e) => {
    setDate(e)
  }
  
  useEffect(() => {
    title("Dashboard")
  }, [title]); 

  return (
    <>
    <DashWrapper>
      <KpiWrapper>
        <KPI><Bed size={32} /><Number><h2>61</h2><p>New Bookings</p></Number></KPI>
        <KPI><Booking size={32} /><Number><h2>46</h2><p>Scheduled Room</p></Number></KPI>
        <KPI><Login size={32} /><Number><h2>23</h2><p>Check In</p></Number></KPI>
        <KPI><Logout size={32} /><Number><h2>18</h2><p>Check Out</p></Number></KPI>
      </KpiWrapper>
      <CalendarWrapper>
        <p>Recent Booking Schedule</p>
        <Calendar
          value={activeDate}
          onChange={changeDate}
          locale={'EN'}
          minDetail= {'decade'}
          next2Label= {null}
          prev2Label= {null}
          showFixedNumberOfWeeks={true}
          navigationLabel = {({ date, locale}) => date.toLocaleDateString(locale, {year: 'numeric', month: 'long'})}
        />
      </CalendarWrapper>
     
    </DashWrapper>
    </>
  );
}