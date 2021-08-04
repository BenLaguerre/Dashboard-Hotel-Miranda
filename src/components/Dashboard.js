import React  from "react";
import styled from "styled-components";
import { IoBedOutline } from "react-icons/io5";
import { RiCalendarCheckLine } from "react-icons/ri";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import Calendar from 'react-calendar';

const DashWrapper = styled.div`
  margin: 30px auto 0 auto;
  display: flex;
  flex-direction: column;
  width: 90%;
` 

const KpiWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
` 
const KPI = styled.div `
  background: white;
  display: flex;
  align-items: center;
  width: 18%;
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
const CalendarStats = styled.div`
  margin-top: 50px; 
  display: flex;
  justify-content: flex-start;
  
  
`


export default function Dashboard(props) {
  
  return (
    <>
    <DashWrapper>
      <KpiWrapper>
        <KPI><Bed size={32} /><Number><h2>8,461</h2><p>New Booking</p></Number></KPI>
        <KPI><Booking size={32} /><Number><h2>963</h2><p>Scheduled Room</p></Number></KPI>
        <KPI><Login size={32} /><Number><h2>753</h2><p>Check In</p></Number></KPI>
        <KPI><Logout size={32} /><Number><h2>516</h2><p>Check Out</p></Number></KPI>
      </KpiWrapper>

      <CalendarStats>
        <Calendar />
        
      </CalendarStats>
    </DashWrapper>
    </>
  );
}